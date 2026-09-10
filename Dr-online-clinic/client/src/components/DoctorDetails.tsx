
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Doctor {
_id: string;
name: string;
specialty: string;
image: string;
rating: number;
yearsInPractice: number;
availableTime: string;
}

export const DoctorDetails = () => {
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();

const [doctor, setDoctor] = useState<Doctor | null>(null);
const [patientName, setPatientName] = useState('');
const [patientEmail, setPatientEmail] = useState('');
const [date, setDate] = useState('');
const [timeSlot, setTimeSlot] = useState('');
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');

useEffect(() => {
fetch(`http://localhost:5000/api/doctors/${id}`)
.then((res) => res.json())
.then((data) => setDoctor(data))
.catch((err) => console.error(err));
}, [id]);

const handleBooking = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
setMessage('');

try {
const response = await fetch('http://localhost:5000/api/appointments', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
patientName,
patientEmail,
doctorId: id,
date,
timeSlot,
}),
});

if (response.ok) {
setMessage('Appointment booked successfully!');
setTimeout(() => navigate('/appointments'), 1500);
} else {
setMessage('Failed to book appointment.');
}
} catch  {
setMessage('Error connecting to server.');
} finally {
setLoading(false);
}
};

if (!doctor) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading clinic data...</div>;

return (
<div className="app-container" style={{ maxWidth: '850px' }}>
<button
  onClick={() => navigate(-1)}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',

    padding: '10px 10px',

    background: 'rgb(255, 255, 255)',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',

    color: '#564769',
    cursor: 'pointer',

    marginBottom: '10px',

    fontSize: '14px',
    fontWeight: 400,

    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',

    transition: 'all 0.2s ease',
  }}
>
  <span style={{ fontSize: '18px' }}>←</span>
  <span>Back to Doctors List</span>
</button>

<div className="medical-card" style={{ padding: '24px', marginBottom: '24px', display: 'flex', gap: '24px', alignItems: 'center' }}>
<img
src={doctor.image}
alt={doctor.name}
style={{ width: '130px', height: '130px', borderRadius: '12px', objectFit: 'cover' }}
/>
<div style={{ flex: 1 }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
<h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem' }}>{doctor.name}</h2>
<span className="badge-available">{doctor.availableTime}</span>
</div>
<p style={{ color: 'var(--secondary)', fontWeight: 500, margin: '0 0 12px 0' }}>{doctor.specialty}</p>
<div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
<span>⭐<strong>{doctor.rating}</strong> / 5</span>
<span>🩺<strong>{doctor.yearsInPractice}</strong> Years Experience</span>
</div>
</div>
</div>


<div className="medical-card" style={{ padding: '32px' }}>
<h3 style={{ margin: '0 0 8px 0', color: 'var(--primary)' }}>Book Your Appointment</h3>
<p style={{ color: 'var(--text-muted)', margin: '0 0 24px 0', fontSize: '0.95rem' }}>Fill in your details below to secure your consultation slot.</p>

{message && (
<div style={{ padding: '12px', borderRadius: '8px', marginBottom: '20px', backgroundColor: message.includes('success') ? '#ecfdf5' : '#fef2f2', color: message.includes('success') ? '#047857' : '#dc2626' }}>
{message}
</div>
)}


<form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
<div>
<label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Full Name</label>
<input
type="text"
placeholder="e.g. John Doe"
value={patientName}
onChange={(e) => setPatientName(e.target.value)}
required
style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}
/>
</div>

<div>
<label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Email Address</label>
<input
type="email"
placeholder="patient@example.com"
value={patientEmail}
onChange={(e) => setPatientEmail(e.target.value)}
required
style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}
/>
</div>

<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
<div>
<label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Preferred Date</label>
<input
type="date"
value={date}
onChange={(e) => setDate(e.target.value)}
required
style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}
/>
</div>

<div>
<label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '0.9rem' }}>Preferred Time</label>
<input
type="time"
value={timeSlot}
onChange={(e) => setTimeSlot(e.target.value)}
required
style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}
/>
</div>
</div>

<button type="submit" className="btn-primary" disabled={loading} style={{
  marginTop: '12px',
  padding: '14px 18px',

  background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
  color: '#ffffff',

  borderRadius: '12px',
  border: 'none',

  boxShadow: '0 6px 18px rgba(37, 99, 235, 0.25)',

  fontWeight: 600,
}}>
{loading ? 'Confirming Appointment...' : 'Confirm Appointment'}
</button>
</form>
</div>
</div>
);
};