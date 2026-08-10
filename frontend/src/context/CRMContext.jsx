import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const CRMContext = createContext();

export const useCRM = () => useContext(CRMContext);

const API_URL = import.meta.env.VITE_API_URL || 'https://audit-project-9yo1.onrender.com';

// Maps a backend Audit document to the flat shape the dashboards already use
// (id / clientId / juniorId / reportDocument) so no dashboard component had to change.
const mapAudit = (a) => ({
  id: a._id,
  title: a.title,
  clientId: a.client?._id,
  clientName: a.client?.name,
  juniorId: a.assignedTo?._id,
  juniorName: a.assignedTo?.name,
  status: a.status,
  amount: a.amount,
  description: a.description,
  reportDocument: a.documents?.length ? a.documents[a.documents.length - 1].name : null,
  feedback: a.feedback || '',
});

const mapUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
  company: u.company,
});

const mapBooking = (b) => ({
  id: b._id,
  bookingId: b.bookingId,
  fullName: b.fullName,
  companyName: b.companyName,
  businessEmail: b.businessEmail,
  mobileNumber: b.mobileNumber,
  servicesInterestedIn: b.servicesInterestedIn || [],
  status: b.status,
  trackerStage: b.trackerStage,
  createdAt: b.createdAt,
});

const mapNotification = (n) => ({
  id: n._id,
  type: n.type,
  title: n.title,
  message: n.message,
  priority: n.priority,
  link: n.link,
  read: n.read,
  createdAt: n.createdAt,
});

export const CRMProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('crmUser')) || null
  );
  const [token, setToken] = useState(localStorage.getItem('crmToken') || null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const authHeaders = useCallback(
    () => ({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }),
    [token]
  );

  const persistSession = (user, tok) => {
    setCurrentUser(user);
    setToken(tok);
    localStorage.setItem('crmUser', JSON.stringify(user));
    localStorage.setItem('crmToken', tok);
  };

  const clearSession = () => {
    setCurrentUser(null);
    setToken(null);
    setUsers([]);
    setTasks([]);
    setBookings([]);
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('crmUser');
    localStorage.removeItem('crmToken');
  };

  // ---- Data loading, scoped to the logged-in user's role ----
  const refreshAudits = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/audits`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setTasks(data.map(mapAudit));
    } catch (err) {
      console.error('Failed to load engagements:', err);
    }
  }, [token, authHeaders]);

  const refreshUsers = useCallback(async () => {
    if (!token || currentUser?.role !== 'admin') return;
    try {
      const res = await fetch(`${API_URL}/api/users`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setUsers(data.map(mapUser));
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  }, [token, currentUser, authHeaders]);

  const refreshBookings = useCallback(async () => {
    if (!token || currentUser?.role !== 'admin') return;
    try {
      const res = await fetch(`${API_URL}/api/bookings`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setBookings(data.map(mapBooking));
    } catch (err) {
      console.error('Failed to load bookings:', err);
    }
  }, [token, currentUser, authHeaders]);

  const refreshNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/api/notifications`, { headers: authHeaders() });
      const body = await res.json();
      if (res.ok) {
        setNotifications(body.data.notifications.map(mapNotification));
        setUnreadCount(body.data.unreadCount);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  }, [token, authHeaders]);

  useEffect(() => {
    if (token && currentUser) {
      setLoading(true);
      Promise.all([refreshAudits(), refreshUsers(), refreshBookings(), refreshNotifications()]).finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentUser?.role]);

  // ---- Auth actions ----
  const login = async (email, password, role) => {
    setError('');
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Login failed');
      throw new Error(data.message || 'Login failed');
    }
    persistSession(mapUser(data.user), data.token);
    return mapUser(data.user);
  };

  const loginWithGoogle = async (role) => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Google sign-in failed');
        throw new Error(data.message || 'Google sign-in failed');
      }
      persistSession(mapUser(data.user), data.token);
      return mapUser(data.user);
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (auth.currentUser) await signOut(auth);
    } catch {
      // fine if there was no active Firebase session (email/password login)
    }
    clearSession();
  };

  const resetPassword = async (email, newPassword) => {
    setError('');
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Password reset failed');
      throw new Error(data.message || 'Password reset failed');
    }
    return data.message;
  };

  // ---- Engagement (audit) actions -- all hit the real backend now ----
  const assignTask = async (title, clientId, juniorId) => {
    const res = await fetch(`${API_URL}/api/audits`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ title, client: clientId, assignedTo: juniorId }),
    });
    const data = await res.json();
    if (res.ok) setTasks((prev) => [mapAudit(data), ...prev]);
    return res.ok;
  };

  const updateAuditStatus = async (taskId, status, feedback) => {
    const res = await fetch(`${API_URL}/api/audits/${taskId}/status`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status, ...(feedback !== undefined ? { feedback } : {}) }),
    });
    const data = await res.json();
    if (res.ok) setTasks((prev) => prev.map((t) => (t.id === taskId ? mapAudit(data) : t)));
    return res.ok;
  };

  const submitReport = async (taskId, documentName) => {
    const res = await fetch(`${API_URL}/api/audits/${taskId}/submit`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ document: documentName }),
    });
    const data = await res.json();
    if (res.ok) setTasks((prev) => prev.map((t) => (t.id === taskId ? mapAudit(data) : t)));
    return res.ok;
  };

  const approveReport = (taskId) => updateAuditStatus(taskId, 'completed');
  const rejectReport = (taskId, feedback) => updateAuditStatus(taskId, 'in_progress', feedback);
  const startTask = (taskId) => updateAuditStatus(taskId, 'in_progress');

  // ---- Booking workflow actions ----
  const approveBooking = async (bookingId, juniorId) => {
    const res = await fetch(`${API_URL}/api/bookings/${bookingId}/approve`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ assignedTo: juniorId }),
    });
    const data = await res.json();
    if (res.ok) {
      await Promise.all([refreshBookings(), refreshAudits()]);
    }
    return { ok: res.ok, message: data.message };
  };

  const rejectBooking = async (bookingId, reason) => {
    const res = await fetch(`${API_URL}/api/bookings/${bookingId}/reject`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    if (res.ok) await refreshBookings();
    return { ok: res.ok, message: data.message };
  };

  // ---- Notifications ----
  const markNotificationRead = async (notificationId) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
    await fetch(`${API_URL}/api/notifications/${notificationId}/read`, { method: 'PATCH', headers: authHeaders() }).catch(() => {});
  };

  const markAllNotificationsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    await fetch(`${API_URL}/api/notifications/read-all`, { method: 'PATCH', headers: authHeaders() }).catch(() => {});
  };

  const value = {
    users,
    currentUser,
    tasks,
    bookings,
    notifications,
    unreadCount,
    loading,
    error,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    assignTask,
    submitReport,
    approveReport,
    rejectReport,
    startTask,
    approveBooking,
    rejectBooking,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};
