import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
}

interface AppointmentItem {
  _id: string;
  patientName: string;
  patientEmail: string;
  doctorId: Doctor | null;
  date: string;
  timeSlot: string;
  status?: 'pending' | 'accepted' | 'rejected' | 'cancelled';
}

export const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/appointments')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: AppointmentItem[]) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading appointments...</div>;
  }

  if (errorMsg) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
        <h3>Failed to load appointments</h3>
        <p>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#0f172a' }}>My Appointments</h2>
        <button
          onClick={() => navigate('/doctors')}
          style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          + Book New Visit
        </button>
      </div>

      {appointments.length === 0 ? (
        <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b' }}>
          No appointments found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {appointments.map((app) => (
            <div
              key={app._id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                 justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#0f172a' }}>
                  {app.doctorId ? app.doctorId.name : 'Doctor Profile'}
                </h3>
                <p style={{ margin: '0 0 8px 0', color: '#0d9488', fontSize: '0.9rem', fontWeight: 500 }}>
                  {app.doctorId ? app.doctorId.specialty : 'General'}
                </p>
                <div style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', gap: '16px' }}>
                  <span>📅 {app.date}</span>
                  <span>⏰ {app.timeSlot}</span>
                  <span>👤 {app.patientName}</span>
                </div>
              </div>
              <div>
                <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 12px', borderRadius: '12px', fontWeight: 600, fontSize: '0.85rem' }}>
                  {app.status || 'pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;