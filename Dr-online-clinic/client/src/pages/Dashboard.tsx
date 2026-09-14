import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Interfaces & Types
interface UserType {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: string;
}

interface DayItem {
  dayNumber: number;
  fullDate: string;
  hasAppointment: boolean;
}


const getUserFromStorage = (): UserType | null => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? (JSON.parse(storedUser) as UserType) : null;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null;
  }
};

export const Dashboard: React.FC = () => {
 
  const user = getUserFromStorage();


  const [selectedDate, setSelectedDate] = useState<string>('2026-09-20');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 8, 1)); // September 2026

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2026-09-20',
      time: '10:30 AM',
      status: 'Confirmed',
    },
    {
      id: '2',
      doctorName: 'Dr. Ahmad Rahhal',
      specialty: 'Dermatologist',
      date: '2026-09-20',
      time: '02:00 PM',
      status: 'Confirmed',
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Davis',
      specialty: 'Pediatrician',
      date: '2026-09-25',
      time: '11:15 AM',
      status: 'Pending',
    },
  ]);

  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (): (DayItem | null)[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days: (DayItem | null)[] = [];

    
    for (let i = 0; i < date.getDay(); i++) {
      days.push(null);
    }


    while (date.getMonth() === month) {
      const yearStr = date.getFullYear();
      const monthStr = String(date.getMonth() + 1).padStart(2, '0');
      const dayStr = String(date.getDate()).padStart(2, '0');
      const fullDateStr = `${yearStr}-${monthStr}-${dayStr}`;

      days.push({
        dayNumber: date.getDate(),
        fullDate: fullDateStr,
        hasAppointment: appointments.some((a) => a.date === fullDateStr),
      });
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const daysInMonth = getDaysInMonth();
  const selectedDayAppointments = appointments.filter((a) => a.date === selectedDate);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
     
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
            Welcome, {user?.name || 'Patient'} 👋
          </h1>
          <p style={{ color: '#64748b', margin: 0 }}>Manage your schedule and health appointments seamlessly.</p>
        </div>
<Link
          to="/doctors"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '0.9rem',
            textDecoration: 'none',
            boxShadow: '0 8px 16px -4px rgba(2, 132, 199, 0.3)',
            transition: 'all 0.2s ease',
          }}
        >
          <Plus size={18} />
          <span>Book New Appointment</span>
        </Link>
      </div>

      
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        
        <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={22} color="#0284c7" />
              <span>
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
            </h2>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handlePrevMonth}
                style={{ padding: '6px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer', display: 'flex' }}
              >
                <ChevronLeft size={18} color="#475569" />
              </button>
              <button
                onClick={handleNextMonth}
                style={{ padding: '6px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer', display: 'flex' }}
              >
                <ChevronRight size={18} color="#475569" />
              </button>
            </div>
          </div>

          {/* Days Header Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '0.8rem' }}>
            {daysOfWeek.map((day) => (
              <span key={day} style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>
                {day}
              </span>
            ))}
          </div>

          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {daysInMonth.map((item, index) => {
              if (!item) return <div key={`empty-${index}`} />;

              const isSelected = item.fullDate === selectedDate;

              return (
                <button
                  key={item.fullDate}
                  onClick={() => setSelectedDate(item.fullDate)}
                  style={{
                    padding: '12px 0',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: isSelected ? '#0284c7' : '#f8fafc',
                    color: isSelected ? '#ffffff' : '#1e293b',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                  }}
                >
{item.dayNumber}
                  {item.hasAppointment && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#ffffff' : '#0284c7',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Appointments List */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                Appointments on {selectedDate}
              </h3>
              <span style={{ fontSize: '0.825rem', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 10px', borderRadius: '20px', fontWeight: '700' }}>
                {selectedDayAppointments.length} Booked
              </span>
            </div>

            {selectedDayAppointments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedDayAppointments.map((app) => (
                  <div
                    key={app.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '16px',
                      backgroundColor: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          backgroundColor: '#0284c7',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <User size={22} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>{app.doctorName}</h4>
                        <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: '600' }}>{app.specialty}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0f2fe', paddingTop: '0.75rem', fontSize: '0.825rem', color: '#475569' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                        <Clock size={16} color="#0284c7" /> {app.time}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontWeight: '700' }}>
                        <CheckCircle size={15} /> {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
<CalendarIcon size={36} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '600' }}>No appointments scheduled for this day.</p>
                <p style={{ margin: '0.25rem 0 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>Select another date or click "Book New Appointment".</p>
              </div>
            )}
          </div>

          
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>{appointments.length}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Total Bookings</span>
            </div>
            <div style={{ borderLeft: '1px solid #e2e8f0' }} />
            <div>
              <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: '#16a34a' }}>5</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Medical Records</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
