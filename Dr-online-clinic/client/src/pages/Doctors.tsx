import React, { useState, useEffect } from 'react';
import DoctorCard  from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';

interface Doctor {
_id: string;
name: string;
specialty: string;
image: string;
rating: number;
yearsInPractice: number;
visitLength: number;
availableTime: string;
}

export const Doctors = () => {
const [doctors, setDoctors] = useState<Doctor[]>([]);
const [search, setSearch] = useState('');

useEffect(() => {
fetch('http://localhost:5000/api/doctors')
.then((res) => res.json())
.then((data) => setDoctors(data))
.catch((err) => console.error(err));
}, []);

const filteredDoctors = doctors.filter(
(doc) =>
doc.name.toLowerCase().includes(search.toLowerCase()) ||
doc.specialty.toLowerCase().includes(search.toLowerCase())
);

return (
<div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>

<div
style={{
position: 'relative',
backgroundImage:` linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.75)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80')`,
backgroundSize: 'cover',
backgroundPosition: 'center',
color: '#ffffff',
padding: '60px 20px',
borderRadius: '0 0 24px 24px',
marginBottom: '30px',
boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
}}
>
<div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
<h1
  style={{
    fontSize: 'clamp(2rem, 6vw, 4rem)',
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: '-0.04em',
    margin: '0 auto 20px',
    maxWidth: '850px',
    textAlign: 'center',
    color: '#172033',
  }}
>
  Find & Book{' '}
  <span
    style={{
      background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    Top Medical Specialists
  </span>
</h1>
<p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '50px' }}>
Connect with verified doctors, view schedules, and confirm your visit in minutes.
</p>


<div style={{ maxWidth: '600px', margin: '0 auto' }}>
<SearchBar value={search} onChange={setSearch} />
</div>
</div>
</div>


<div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px 40px' }}>
<h2 style={{ fontSize: '1.4rem', color: '#1e293b', marginBottom: '20px' }}>
Available Physicians ({filteredDoctors.length})
</h2>

<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
{filteredDoctors.map((doc) => (
<DoctorCard key={doc._id} doctor={doc} />
))}
</div>
</div>
</div>
);
};


