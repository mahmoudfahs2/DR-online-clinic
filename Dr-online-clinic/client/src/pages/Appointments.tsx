
import React, { useState, useEffect } from 'react';

interface Appointment {
_id: string;
doctorName: string;
description?: string;
date: string;
time: string;
patientName: string;
status: 'pending' | 'confirmed' | 'cancelled';
}

const API_BASE_URL = 'http://localhost:5000/api/appointments';

export const Appointments = () => {
const [appointments, setAppointments] = useState<Appointment[]>([]);
const [loading, setLoading] = useState<boolean>(true);


useEffect(() => {
let isMounted = true;

const fetchAppointments = async () => {
try {
const response = await fetch(API_BASE_URL).catch(() => fetch('/api/appointments'));

if (response && response.ok) {
const contentType = response.headers.get('content-type');
if (contentType && contentType.includes('application/json')) {
const data = await response.json();
if (isMounted) {
setAppointments(data);
}
}
}
} catch (err) {
console.error('Error fetching appointments:', err);
} finally {
if (isMounted) setLoading(false);
}
};

fetchAppointments();

return () => {
isMounted = false;
};
}, []);


const handleStatusChange = async (id: string, newStatus: 'confirmed' | 'cancelled') => {

setAppointments((prev) =>
prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
);

try {
const response = await fetch(`${API_BASE_URL}/${id}/status`, {
method: 'PATCH', 
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ status: newStatus }),
});

if (!response.ok) {
console.error('Server failed to update status');
}
} catch (error) {
console.error('Network error updating status:', error);
}
};

return (
<div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
<h2 style={{ margin: 0, color: '#0f172a' }}>My Appointments</h2>
<button
style={{
padding: '10px 18px',
backgroundColor: '#0284c7',
color: '#fff',
border: 'none',
borderRadius: '8px',
fontWeight: '700',
cursor: 'pointer',
}}
>
+ Book New Visit
</button>
</div>

{loading ? (
<p style={{ color: '#64748b' }}>Loading appointments...</p>
) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
{appointments.length > 0 ? (
appointments.map((app) => (
<div
key={app._id}
style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
padding: '1.25rem',
borderRadius: '12px',
backgroundColor: '#ffffff',
border: '1px solid #e2e8f0',
boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
}}
>
<div>
<h3 style={{ margin: '0 0 0.25rem 0', color: '#1e293b' }}>{app.doctorName}</h3>
<p style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.875rem' }}>
{app.description || 'Board-certified family physician focused on preventive healthcare.'}
</p>


<div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#475569' }}>
<span>📅{app.date}</span>
<span>⏰{app.time}</span>
<span>👤{app.patientName}</span>
</div>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
{app.status === 'pending' ? (
<>
<button
onClick={() => handleStatusChange(app._id, 'confirmed')}
style={{
padding: '8px 16px',
backgroundColor: '#16a34a',
color: '#fff',
border: 'none',
borderRadius: '8px',
fontWeight: '600',
cursor: 'pointer',
}}
>
Accept
</button>
<button
onClick={() => handleStatusChange(app._id, 'cancelled')}
style={{
padding: '8px 16px',
backgroundColor: '#dc2626',
color: '#fff',
border: 'none',
borderRadius: '8px',
fontWeight: '600',
cursor: 'pointer',
}}
>
Reject
</button>
</>
) : (
<span
style={{
padding: '6px 14px',
borderRadius: '20px',
fontSize: '0.85rem',
fontWeight: '700',
backgroundColor:
app.status === 'confirmed'
? '#dcfce7'
: app.status === 'cancelled'
? '#fef3c7'
: '#f1f5f9',
color:
app.status === 'confirmed'
? '#15803d'
: app.status === 'cancelled'
? '#b45309'
: '#475569',
textTransform: 'lowercase',
}}
>
{app.status}
</span>
)}
</div>
</div>
))
) : (
<p style={{ color: '#64748b' }}>No appointments found.</p>
)}
</div>
)}
</div>
);
};

export default Appointments;