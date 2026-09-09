
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
headers: {
'Content-Type': 'application/json',
},
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
// إعادة التوجيه إلى لوحة المواعيد أو الرئيسية بعد ثانتين
setTimeout(() => navigate('/doctors'), 2000);
} else {
setMessage('Failed to book appointment. Please try again.');
}
} catch (error) {
console.error('Booking error:', error);
setMessage('Error connecting to server.');
} finally {
setLoading(false);
}
};

if (!doctor) return <div>Loading doctor details...</div>;

return (
<div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
<button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
← Back
</button>

{/* تفاصيل الطبيب */}
<div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
<img
src={doctor.image}
alt={doctor.name}
style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover' }}
/>
<div>
<h2>{doctor.name}</h2>
<p><strong>Specialty:</strong> {doctor.specialty}</p>
<p><strong>Rating:</strong> {doctor.rating} / 5</p>
<p><strong>Experience:</strong> {doctor.yearsInPractice} years</p>
<p><strong>Next Available:</strong> {doctor.availableTime}</p>
</div>
</div>

{/* نموذج الحجز */}
<div style={{ borderTop: '1px solid #ccc', paddingTop: '20px' }}>
<h3>Book Your Appointment</h3>

{message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}

<form onSubmit={handleBooking}>
<div style={{ marginBottom: '15px' }}>
<label>Your Full Name</label>
<input
type="text"
placeholder="John Doe"
value={patientName}
onChange={(e) => setPatientName(e.target.value)}
required
style={{ width: '100%', padding: '8px', marginTop: '5px' }}
/>
</div>

<div style={{ marginBottom: '15px' }}>
<label>Email Address</label>
<input
type="email"
placeholder="patient@example.com"
value={patientEmail}
onChange={(e) => setPatientEmail(e.target.value)}
required
style={{ width: '100%', padding: '8px', marginTop: '5px' }}
/>
</div>

Mahmoud:
<div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
<div style={{ flex: 1 }}>
<label>Date</label>
<input
type="date"
value={date}
onChange={(e) => setDate(e.target.value)}
required
style={{ width: '100%', padding: '8px', marginTop: '5px' }}
/>
</div>

<div style={{ flex: 1 }}>
<label>Time Slot</label>
<input
type="time"
value={timeSlot}
onChange={(e) => setTimeSlot(e.target.value)}
required
style={{ width: '100%', padding: '8px', marginTop: '5px' }}
/>
</div>
</div>

<button
type="submit"
disabled={loading}
style={{
width: '100%',
padding: '12px',
backgroundColor: '#007bff',
color: '#fff',
border: 'none',
borderRadius: '5px',
cursor: 'pointer',
}}
>
{loading ? 'Confirming...' : 'Confirm Booking'}
</button>
</form>
</div>
</div>
);
};