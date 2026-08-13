import React, { useState, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Navigate } from 'react-router-dom';
import PortalTopbar from '../../components/crm/PortalTopbar';
import PortalSidebar from '../../components/crm/PortalSidebar';
import { FileText, Download, Upload, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDocuments = () => {
  const { currentUser, logout, tasks } = useCRM();
  const [documents, setDocuments] = useState([]);
  const [selectedAudit, setSelectedAudit] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'https://audit-project-9yo1.onrender.com';
  const token = localStorage.getItem('crmToken');



  // Filter tasks for admin based on search term (client or title)
  const filteredTasks = tasks.filter(t => 
    t.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/crm/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-portal-bg font-sans pb-20 flex flex-col">
      <PortalTopbar title="Admin Portal" subtitle="Firm Documents" userName={currentUser.name} userRole="Senior Partner" onLogout={logout} />
      <div className="flex flex-1">
        <PortalSidebar role="admin" />
        <div className="flex-1 px-6 lg:px-12 py-10 w-full overflow-x-hidden bg-gradient-to-br from-[#F4F6F8] to-[#E9EDF1]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-portal-ink mb-2">Firm Documents</h2>
            <p className="text-portal-muted">Oversee and upload files across all firm engagements.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1 space-y-6">
              
              <div className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm">
                <h3 className="text-lg font-serif text-portal-ink mb-4">Select Engagement</h3>
                
                <div className="mb-4 relative">
                  <Search size={14} className="absolute left-3 top-3 text-portal-muted" />
                  <input 
                    type="text" 
                    placeholder="Search by client or project..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-portal-line rounded-md text-sm focus:outline-none focus:border-theme-charcoal focus:ring-1 focus:ring-theme-charcoal bg-portal-bg"
                  />
                </div>

                <div className="max-h-[250px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {filteredTasks.length > 0 ? filteredTasks.map(task => (
                    <button
                      key={task.id}
                      onClick={() => setSelectedAudit(task.id)}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${selectedAudit === task.id ? 'bg-theme-charcoal text-white border-theme-charcoal shadow-sm' : 'bg-portal-bg border-portal-line text-portal-ink hover:border-theme-olive'}`}
                    >
                      <span className="block font-semibold truncate">{task.title}</span>
                      <span className={`block text-xs truncate mt-0.5 ${selectedAudit === task.id ? 'text-white/70' : 'text-portal-muted'}`}>{task.clientName}</span>
                    </button>
                  )) : (
                    <p className="text-xs text-portal-muted text-center py-4">No engagements found.</p>
                  )}
                </div>
              </div>

              <div className="bg-portal-card p-6 rounded-xl border border-portal-line shadow-sm">
                <h3 className="text-lg font-serif text-portal-ink mb-4">Upload File</h3>
                {error && <p className="text-portal-danger text-sm mb-4">{error}</p>}
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-portal-muted font-semibold mb-2">Select File</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])} required className="w-full border border-portal-line p-2 rounded-md text-sm bg-portal-bg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-theme-charcoal file:text-white" />
                  </div>
                  <button type="submit" disabled={uploading || !selectedAudit} className="w-full bg-theme-olive text-white px-4 py-3 rounded-md text-sm font-semibold hover:bg-theme-charcoal transition-colors shadow-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Upload size={16}/> {uploading ? 'Uploading...' : 'Upload to Project'}
                  </button>
                  {!selectedAudit && <p className="text-xs text-portal-muted text-center mt-2">Select a project above first.</p>}
                </form>
              </div>

            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-portal-card rounded-xl shadow-sm border border-portal-line overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="p-6 border-b border-portal-line bg-portal-bg flex items-center justify-between shrink-0">
                <h3 className="text-lg font-serif text-portal-ink flex items-center gap-2"><FileText size={18} className="text-portal-gold"/> Associated Files</h3>
                {!selectedAudit && <span className="text-xs text-portal-muted">Select an engagement</span>}
              </div>
              <div className="divide-y divide-portal-line flex-grow overflow-y-auto">
                {selectedAudit ? (
                  documents.length > 0 ? documents.map(doc => (
                    <div key={doc._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-portal-bg/50 transition-colors">
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
                      }} className="bg-portal-bg border border-portal-line text-portal-ink px-4 py-2 rounded text-xs font-semibold hover:bg-theme-charcoal hover:text-white transition-colors flex items-center gap-2 shrink-0">
                        <Download size={14}/> Download
                      </button>
                    </div>
                  )) : (
                    <div className="p-10 text-center text-portal-muted text-sm flex flex-col items-center justify-center h-full">
                      <FileText size={48} className="text-portal-line mb-4" />
                      No documents found for this engagement.
                    </div>
                  )
                ) : (
                  <div className="p-10 text-center text-portal-muted text-sm border-2 border-dashed border-portal-line mx-6 my-6 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
                    <Search size={32} className="text-portal-muted/50 mb-4" />
                    Please select an engagement from the left panel to view and upload documents.
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
