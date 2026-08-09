import React, { useState, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import { FileText, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const JuniorDocuments = () => {
  const { currentUser, logout, tasks } = useCRM();
  const [documents, setDocuments] = useState([]);
  const [selectedAudit, setSelectedAudit] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || '';
  const token = localStorage.getItem('crmToken');



  const myTasks = tasks.filter(t => t.juniorId === currentUser.id);

  const fetchDocuments = async () => {
    if (!selectedAudit) return;
    try {
      const res = await fetch(`${API_URL}/api/documents/audit/${selectedAudit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [selectedAudit]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedAudit) return;
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('relatedType', 'audit');
    formData.append('relatedId', selectedAudit);

    try {
      const res = await fetch(`${API_URL}/api/documents/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setFile(null);
        fetchDocuments();
      } else {
        const errData = await res.json();
        setError(errData.message || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed due to network error.');
    } finally {
      setUploading(false);
    }
  };

  if (!currentUser || currentUser.role !== 'junior') {
    return <Navigate to="/crm/junior/login" replace />;
  }

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Junior Portal" subtitle="Document Center" userName={currentUser.name} userRole="Field Auditor" onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="junior" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">Document Center</h2>
            <p className="text-portal-muted">Access client files, upload your fieldwork findings, and manage audit documents.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1 space-y-6">
              
              <div className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm">
                <h3 className="text-lg font-serif text-portal-ink mb-4">View Task Files</h3>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2">Select Task</label>
                  <select value={selectedAudit} onChange={e => setSelectedAudit(e.target.value)} required className="w-full border border-portal-line p-3 rounded-md focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg text-sm">
                    <option value="">Choose a task...</option>
                    {myTasks.map(p => <option key={p.id} value={p.id}>{p.title} ({p.clientName})</option>)}
                  </select>
                </div>
              </div>

              <div className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm">
                <h3 className="text-lg font-serif text-portal-ink mb-4">Upload Findings</h3>
                {error && <p className="text-portal-danger text-sm mb-4">{error}</p>}
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2">Select File</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])} required className="w-full border border-portal-line p-2 rounded-md text-sm bg-portal-bg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-theme-charcoal file:text-white" />
                  </div>
                  <button type="submit" disabled={uploading || !selectedAudit} className="w-full bg-theme-olive text-white px-4 py-3 rounded-md text-sm font-semibold hover:bg-theme-charcoal transition-colors shadow-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Upload size={16}/> {uploading ? 'Uploading...' : 'Upload Document'}
                  </button>
                  {!selectedAudit && <p className="text-xs text-portal-muted text-center mt-2">Select a task above first.</p>}
                </form>
              </div>

            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden">
              <div className="p-6 border-b border-portal-line bg-portal-bg flex items-center justify-between">
                <h3 className="text-lg font-serif text-portal-ink flex items-center gap-2"><FileText size={18} className="text-portal-gold"/> Associated Files</h3>
                {!selectedAudit && <span className="text-xs text-portal-muted">Select a task</span>}
              </div>
              <div className="divide-y divide-portal-line">
                {selectedAudit ? (
                  documents.length > 0 ? documents.map(doc => (
                    <div key={doc._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-portal-gold-soft text-portal-gold flex items-center justify-center shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-portal-ink text-sm">{doc.originalName}</h4>
                          <p className="text-xs text-portal-muted">{(doc.size / 1024).toFixed(2)} KB • {new Date(doc.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button onClick={async () => {
                        try {
                          const res = await fetch(`${API_URL}/api/documents/download/${doc._id}`, { headers: { Authorization: `Bearer ${token}` } });
                          if (!res.ok) throw new Error('Download failed');
                          const blob = await res.blob();
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = doc.originalName;
                          document.body.appendChild(a);
                          a.click();
                          a.remove();
                        } catch (err) { alert('Download failed: ' + err.message); }
                      }} className="bg-portal-bg border border-portal-line text-portal-ink px-4 py-2 rounded text-xs font-semibold hover:bg-theme-charcoal hover:text-white transition-colors flex items-center gap-2">
                        <Download size={14}/> Download
                      </button>
                    </div>
                  )) : (
                    <div className="p-10 text-center text-portal-muted text-sm">No documents found for this task.</div>
                  )
                ) : (
                  <div className="p-10 text-center text-portal-muted text-sm border-2 border-dashed border-portal-line mx-6 my-6 rounded-lg">Please select a task from the left panel to view and upload documents.</div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JuniorDocuments;
