
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Lock, Mail, User } from 'lucide-react';

export const Register: React.FC = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [role, setRole] = useState<'patient' | 'doctor'>('patient');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setError('');
setLoading(true);

try {
const response = await fetch('http://localhost:5000/api/auth/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, email, password, role }),
});

const data = await response.json();

if (response.ok) {

localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.user));


navigate('/records');
} else {
setError(data.message || 'فشل إنشاء الحساب');
}
} catch  {
setError('تعذر الاتصال بالسيرفر');
} finally {
setLoading(false);
}
};

return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
<form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', maxWidth: '420px' }}>
<h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', textAlign: 'center' }}>إنشاء حساب جديد</h2>

{error && <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</div>}

<div style={{ marginBottom: '1rem' }}>
<label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>الاسم الكامل</label>
<div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px' }}>
<User size={18} color="#64748b" style={{ marginLeft: '8px' }} />
<input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%' }} placeholder="اسم المستخدم" />
</div>
</div>

<div style={{ marginBottom: '1rem' }}>
<label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>البريد الإلكتروني</label>
<div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px' }}>
<Mail size={18} color="#64748b" style={{ marginLeft: '8px' }} />
<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%' }} placeholder="example@mail.com" />
</div>
</div>

<div style={{ marginBottom: '1rem' }}>
<label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>كلمة المرور</label>
<div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px' }}>
<Lock size={18} color="#64748b" style={{ marginLeft: '8px' }} />
<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ border: 'none', outline: 'none', width: '100%' }} placeholder="••••••••" />
</div>
</div>

mm:
<div style={{ marginBottom: '1.5rem' }}>
<label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>نوع الحساب</label>
<select value={role} onChange={(e) => setRole(e.target.value as 'patient' | 'doctor')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}>
<option value="patient">مريض (Patient)</option>
<option value="doctor">طبيب (Doctor)</option>
</select>
</div>

<button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #2563eb, #06b6d4)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
<UserPlus size={18} /> {loading ? 'جاري التقييد...' : 'تسجيل الحساب'}
</button>

<p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
لديك حساب بالفعل؟ <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>سجل الدخول هنا</Link>
</p>
</form>
</div>
);
};

export default Register;