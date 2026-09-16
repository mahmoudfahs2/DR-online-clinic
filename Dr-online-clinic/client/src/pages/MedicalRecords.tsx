import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Plus, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  Activity, 
  Pill, 
  FileSpreadsheet,
  X 
} from 'lucide-react';

interface RecordItem {
  id: string;
  title: string;
  category: 'lab' | 'prescription' | 'scan' | 'general';
  doctorName: string;
  date: string;
  fileSize: string;
}

export const MedicalRecords: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const [records, setRecords] = useState<RecordItem[]>([
    {
      id: '1',
      title: 'Blood Test Results (CBC & Lipid Profile)',
      category: 'lab',
      doctorName: 'Dr. Maya Harb',
      date: 'Sep 12, 2026',
      fileSize: '1.4 MB',
    },
    {
      id: '2',
      title: 'Hypertension Prescription & Treatment Plan',
      category: 'prescription',
      doctorName: 'Dr. John Doe',
      date: 'Aug 28, 2026',
      fileSize: '450 KB',
    },
    {
      id: '3',
      title: 'Chest X-Ray Scan Report',
      category: 'scan',
      doctorName: 'Dr. Ahmad Rahhal',
      date: 'Jul 15, 2026',
      fileSize: '3.8 MB',
    },
  ]);


  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'lab' | 'prescription' | 'scan' | 'general'>('lab');
  const [newDoctor, setNewDoctor] = useState('');

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDoctor) return;

    const newEntry: RecordItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      doctorName: newDoctor,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileSize: '1.2 MB',
    };

    setRecords([newEntry, ...records]);
    setNewTitle('');
    setNewDoctor('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter((rec) => rec.id !== id));
  };

  const filteredRecords = records.filter((rec) => {
    const matchesTab = activeTab === 'all' || rec.category === activeTab;
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'lab':
        return { label: 'Lab Test', bg: '#e0f2fe', color: '#0369a1', icon: <Activity size={14} /> };
      case 'prescription':
        return { label: 'Prescription', bg: '#fef3c7', color: '#b45309', icon: <Pill size={14} /> };
      case 'scan':
        return { label: 'Imaging / Scan', bg: '#f3e8ff', color: '#6b21a8', icon: <FileSpreadsheet size={14} /> };
      default:
        return { label: 'General', bg: '#f1f5f9', color: '#475569', icon: <FileText size={14} /> };
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Medical Records</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
            Manage, upload, and organize your health reports and medical documents.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '0.95rem',
            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)',
            cursor: 'pointer',
          }}
        >
          <Plus size={18} /> Upload New Record
        </button>
      </div>

   
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Total Documents</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '1.8rem', color: '#0f172a' }}>{records.length}</h2>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.85rem', color: '#0369a1', fontWeight: 600 }}>Lab Results</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '1.8rem', color: '#0369a1' }}>
            {records.filter(r => r.category === 'lab').length}
          </h2>
        </div>
        <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 600 }}>Prescriptions</span>
          <h2 style={{ margin: '8px 0 0 0', fontSize: '1.8rem', color: '#b45309' }}>
            {records.filter(r => r.category === 'prescription').length}
          </h2>
        </div>
      </div>

      
      <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
       
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f1f5f9', padding: '8px 14px', borderRadius: '10px', flex: '1', minWidth: '240px' }}>
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Search records or doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }}
          />
        </div>

       
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'lab', 'prescription', 'scan'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#0f172a' : '#f1f5f9',
                color: activeTab === tab ? '#ffffff' : '#64748b',
                fontWeight: 600,
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                cursor: 'pointer',
              }}
            >
              {tab === 'all' ? 'All Records' : tab}
            </button>
          ))}
        </div>
      </div>


      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((item) => {
            const badge = getCategoryBadge(item.category);
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                    <FileText size={24} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: 700 }}>{item.title}</h4>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: badge.bg, color: badge.color, fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '8px' }}>
                        {badge.icon} {badge.label}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                      Issued by <strong style={{ color: '#334155' }}>{item.doctorName}</strong> • {item.date} • {item.fileSize}
                    </p>
                  </div>
                </div>

             
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button title="View" style={{ border: 'none', background: '#f1f5f9', padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#334155' }}>
                    <Eye size={18} />
                  </button>
                  <button title="Download" style={{ border: 'none', background: '#f1f5f9', padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#2563eb' }}>
                    <Download size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} title="Delete" style={{ border: 'none', background: '#fef2f2', padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#ef4444' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#64748b' }}>
            <FileText size={40} style={{ marginBottom: '10px', opacity: 0.5 }} />
            <p style={{ margin: 0, fontWeight: 600 }}>No medical records found.</p>
          </div>
        )}
      </div>

      
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '500px', borderRadius: '20px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>Upload Medical Record</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddRecord} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blood Test Report"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as RecordItem['category'])}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="lab">Lab Result</option>
                  <option value="prescription">Prescription</option>
                  <option value="scan">Imaging / Scan</option>
                  <option value="general">General Report</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Attending Doctor</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Maya Harb"
                  value={newDoctor}
                  onChange={(e) => setNewDoctor(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

           
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                <Upload size={28} color="#2563eb" style={{ marginBottom: '6px' }} />
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Click to choose file or drag & drop</p>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PDF, PNG, JPG up to 10MB</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MedicalRecords;