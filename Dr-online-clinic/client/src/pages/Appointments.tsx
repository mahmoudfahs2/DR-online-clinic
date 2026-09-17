
import React, { useState, useEffect } from 'react';
import { Calendar, Clock,Plus, Trash2 } from 'lucide-react';
import { fetchWithAuth } from '../utils/api';

interface Appointment {
_id: string;
doctorName: string;
specialty: string;
date: string;
time: string;
status: 'pending' | 'confirmed' | 'cancelled';
}

export const Appointments: React.FC = () => {
const [appointments, setAppointments] = useState<Appointment[]>([]);
const [loading, setLoading] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);


const [doctorName, setDoctorName] = useState('');
const [specialty, setSpecialty] = useState('');
const [date, setDate] = useState('');
const [time, setTime] = useState('');


const fetchAppointments = async () => {
try {
setLoading(true);
const res = await fetchWithAuth('http://localhost:5000/api/appointments');
if (res.ok) {
const data = await res.json();
setAppointments(data);
}
} catch (error) {
console.error('Error fetching appointments:', error);
} finally {
setLoading(false);
}
};

useEffect(() => {
    const loadData=async()=>{
        await fetchAppointments();
    };
 loadData();
}, []);


const handleCreateAppointment = async (e: React.FormEvent) => {
e.preventDefault();
try {
const res = await fetchWithAuth('http://localhost:5000/api/appointments', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ doctorName, specialty, date, time }),
});

if (res.ok) {
const newApp = await res.json();
setAppointments([newApp, ...appointments]);
setIsModalOpen(false);
setDoctorName('');
setSpecialty('');
setDate('');
setTime('');
}
} catch (error) {
console.error('Error creating appointment:', error);
}
};


const handleDelete = async (id: string) => {
try {
const res = await fetchWithAuth(`http://localhost:5000/api/appointments/${id}`, {
method: 'DELETE',
});
if (res.ok) {
setAppointments(appointments.filter((app) => app._id !== id));
}
} catch (error) {
console.error('Error deleting appointment:', error);
}
};

return (
<div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
<div>
<h1 style={{ margin: 0, fontSize: '1.75rem', color: '#0f172a' }}>Appointments</h1>
<p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Manage your upcoming medical consultations</p>
</div>
<button
onClick={() => setIsModalOpen(true)}
style={{
display: 'flex',
alignItems: 'center',
gap: '8px',
padding: '12px 20px',
background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
color: '#fff',
border: 'none',
borderRadius: '12px',
fontWeight: 600,
cursor: 'pointer',
}}
>
<Plus size={18} /> Book Appointment
</button>
</div>

<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
{loading ? (
<p>Loading appointments...</p>
) : appointments.length > 0 ? (
appointments.map((app) => (
<div
key={app._id}
style={{
backgroundColor: '#fff',
padding: '1.25rem',
borderRadius: '16px',
border: '1px solid #e2e8f0',

display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
}}
>
<div>
<h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#0f172a' }}>{app.doctorName}</h4>
<p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#2563eb', fontWeight: 600 }}>{app.specialty}</p>
<div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
<Calendar size={14} /> {app.date}
</span>
<span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
<Clock size={14} /> {app.time}
</span>
</div>
</div>

<button
onClick={() => handleDelete(app._id)}
style={{ border: 'none', background: '#fef2f2', padding: '10px', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}
>
<Trash2 size={18} />
</button>
</div>
))
) : (
<p>No appointments scheduled.</p>
)}
</div>

{/* Book Modal */}
{isModalOpen && (
<div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<form onSubmit={handleCreateAppointment} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '400px' }}>
<h3 style={{ marginTop: 0 }}>Book New Appointment</h3>
<input type="text" placeholder="Doctor Name" required value={doctorName} onChange={(e) => setDoctorName(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
<input type="text" placeholder="Specialty (e.g. Cardiology)" required value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
<input type="date" required value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
<input type="time" required value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', marginBottom: '1rem', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
<div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
<button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}>Cancel</button>
<button type="submit" style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff' }}>Book</button>
</div>
</form>
</div>
)}
</div>
);
};

export default Appointments;