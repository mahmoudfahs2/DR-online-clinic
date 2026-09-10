import React from 'react';
import { Link } from 'react-router-dom';

export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  yearsInPractice: number;
  visitLength?: number;
  availableTime: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="medical-card" style={{ display: 'flex', padding: '20px', gap: '20px', alignItems: 'center' }}>
      <img
        src={doctor.image}
        alt={doctor.name}
        style={{ width: '110px', height: '110px', borderRadius: '12px', objectFit: 'cover' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>{doctor.name}</h3>
          <span className="badge-available">{doctor.availableTime}</span>
        </div>
        <p style={{ margin: '0 0 10px 0', color: '#0d9488', fontWeight: 500 }}>{doctor.specialty}</p>
        <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '0.9rem' }}>
          <span>⭐ <strong>{doctor.rating}</strong> / 5</span>
          <span>🩺 <strong>{doctor.yearsInPractice}</strong> Years Experience</span>
        </div>
      </div>
    <Link
  to={`/doctors/${doctor._id}`}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',

    padding: '12px 22px',

    background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    color: '#fff',

    textDecoration: 'none',
    whiteSpace: 'nowrap',

    borderRadius: '12px',

    fontSize: '15px',
    fontWeight: '600',

    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.25)',

    transition: 'all 0.25s ease',

    cursor: 'pointer',
  }}
>
  Book a visit →
</Link>
    </div>
  );
};

export default DoctorCard;
