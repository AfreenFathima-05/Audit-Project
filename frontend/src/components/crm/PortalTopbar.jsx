import React, { useState } from 'react';
import { LogOut, Bell } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

/**
 * Shared, consistent top bar for every CRM dashboard.
 * Same structure and palette across Admin / Junior / Client so the
 * three portals feel like one product, not three different demos.
 */
const PortalTopbar = ({ title, subtitle, userName, userRole, onLogout }) => {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useCRM();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-theme-charcoal text-theme-ivory py-4 px-6 lg:px-12 flex justify-between items-center shadow-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-theme-bronze/15 border border-theme-bronze/40 p-1.5 flex items-center justify-center shrink-0">
          <img src="/aurilious_logo.png" alt="Aurilious & Co." className="w-full h-full object-cover rounded" />
        </div>
        <div>
          <h1 className="font-serif text-lg md:text-xl tracking-wide leading-tight">{title}</h1>
          <p className="text-xs text-theme-ivory/50 uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Notifications"
            className="relative flex items-center justify-center w-10 h-10 rounded-md bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-portal-danger text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-theme-charcoal rounded-lg shadow-xl border border-theme-charcoal/10 z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-theme-charcoal/10">
                  <span className="font-serif text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllNotificationsRead} className="text-xs text-theme-olive hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                {notifications.length === 0 ? (
                  <p className="text-sm text-theme-charcoal/50 text-center py-8">No notifications yet.</p>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-theme-charcoal/5 hover:bg-theme-ivory transition-colors ${!n.read ? 'bg-theme-bronze/5' : ''}`}
                    >
                      <div className="flex items-start gap-2">
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-theme-bronze mt-1.5 shrink-0" />}
                        <div>
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-theme-charcoal/60 mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <div className="text-right hidden md:block">
          <p className="text-sm font-medium">{userName}</p>
          <p className="text-xs text-theme-bronze">{userRole}</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-theme-ivory/80 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-4 py-2 rounded-md text-sm border border-white/10">
          <LogOut size={16} /> <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default PortalTopbar;
