
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export const Auth: React.FC = () => {
const [isLogin, setIsLogin] = useState(true);
const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({
name: '',
email: '',
password: '',
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setError('');
setLoading(true);


const endpoint = isLogin
? 'http://localhost:5000/api/auth/login'
: 'http://localhost:5000/api/auth/register';

try {
const response = await fetch(endpoint, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(formData),
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.message || 'Authentication failed');
}

if (data.token) localStorage.setItem('token', data.token);
if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

navigate('/doctors');
window.location.reload();
} catch (err) {
const errorObj = err as Error;
if (errorObj.message === 'Failed to fetch') {
setError('Cannot connect to backend server. Make sure Node.js server is running on port 5000.');
} else {
setError(errorObj.message || 'Something went wrong');
}
} finally {
setLoading(false);
}
};

return (
<div
style={{
minHeight: '100vh',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
padding: '2rem 1rem',
fontFamily: "'Inter', sans-serif",
}}
>
<div
style={{
width: '100%',
maxWidth: '440px',
backgroundColor: '#ffffff',
borderRadius: '24px',
padding: '2.5rem 2rem',
boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.12), 0 0 15px rgba(0,0,0,0.03)',
border: '1px solid #e0f2fe',
boxSizing: 'border-box',
position: 'relative',
overflow: 'hidden',
}}
>

<div
style={{
position: 'absolute',
top: 0,
left: 0,
right: 0,
height: '6px',
background: 'linear-gradient(90deg, #2563eb, #06b6d4, #10b981)',
}}
/>


<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
<div
style={{
width: '48px',
height: '48px',
borderRadius: '16px',
background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
color: '#ffffff',
display: 'inline-flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '26px',
fontWeight: 'bold',
boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)',
marginBottom: '1rem',
}}
>
+
</div>
<h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: '0 0 0.5rem 0', letterSpacing: '-0.025em' }}>
DR.online
</h2>
<p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
{isLogin ? 'Sign in to access your Patient Portal' : 'Create an account to start booking appointments'}
</p>
</div>

{/* Toggle Pills Switcher */}
<div
style={{
display: 'flex',
backgroundColor: '#f1f5f9',
padding: '4px',
borderRadius: '14px',
marginBottom: '1.75rem',
}}
>
<button
type="button"
onClick={() => { setIsLogin(true); setError(''); }}
style={{
flex: 1,
padding: '10px 0',
border: 'none',
borderRadius: '10px',
fontSize: '0.875rem',
fontWeight: '600',
cursor: 'pointer',
transition: 'all 0.2s ease',
backgroundColor: isLogin ? '#ffffff' : 'transparent',
color: isLogin ? '#2563eb' : '#64748b',
boxShadow: isLogin ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
}}
>
Sign In
</button>
<button
type="button"
onClick={() => { setIsLogin(false); setError(''); }}
style={{
flex: 1,
padding: '10px 0',
border: 'none',
borderRadius: '10px',
fontSize: '0.875rem',
fontWeight: '600',
cursor: 'pointer',
transition: 'all 0.2s ease',
backgroundColor: !isLogin ? '#ffffff' : 'transparent',
color: !isLogin ? '#2563eb' : '#64748b',
boxShadow: !isLogin ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
}}
>
Sign Up
</button>
</div>


{error && (
<div
style={{
backgroundColor: '#fef2f2',
border: '1px solid #fecaca',
color: '#ef4444',
padding: '0.85rem 1rem',
borderRadius: '12px',
fontSize: '0.825rem',
marginBottom: '1.5rem',
display: 'flex',
alignItems: 'center',
gap: '8px',
lineHeight: '1.4',
}}
>
<Activity size={18} style={{ flexShrink: 0 }} />
<span>{error}</span>
</div>
)}


<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

{/* Full Name Input (Sign Up Only) */}
{!isLogin && (
<div>
<label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
Full Name
</label>
<div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
<User size={18} style={{ position: 'absolute', left: '14px', color: '#94a3b8' }} />
<input
type="text"
name="name"
required
value={formData.name}
onChange={handleChange}
placeholder="e.g. Mahmoud Fahs"
style={{
width: '100%',
padding: '12px 14px 12px 42px',
borderRadius: '12px',
border: '1px solid #cbd5e1',
fontSize: '0.9rem',
outline: 'none',
transition: 'all 0.2s ease',
boxSizing: 'border-box',
backgroundColor: '#f8fafc',
}}
onFocus={(e) => {
e.target.style.borderColor = '#2563eb';
e.target.style.backgroundColor = '#ffffff';
e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
}}
onBlur={(e) => {


e.target.style.borderColor = '#cbd5e1';
e.target.style.backgroundColor = '#f8fafc';
e.target.style.boxShadow = 'none';
}}
/>
</div>
</div>
)}


<div>
<label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
Email Address
</label>
<div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
<Mail size={18} style={{ position: 'absolute', left: '14px', color: '#94a3b8' }} />
<input
type="email"
name="email"
required
value={formData.email}
onChange={handleChange}
placeholder="name@example.com"
style={{
width: '100%',
padding: '12px 14px 12px 42px',
borderRadius: '12px',
border: '1px solid #cbd5e1',
fontSize: '0.9rem',
outline: 'none',
transition: 'all 0.2s ease',
boxSizing: 'border-box',
backgroundColor: '#f8fafc',
}}
onFocus={(e) => {
e.target.style.borderColor = '#2563eb';
e.target.style.backgroundColor = '#ffffff';
e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
}}
onBlur={(e) => {
e.target.style.borderColor = '#cbd5e1';
e.target.style.backgroundColor = '#f8fafc';
e.target.style.boxShadow = 'none';
}}
/>
</div>
</div>


<div>
<label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>
Password
</label>
<div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
<Lock size={18} style={{ position: 'absolute', left: '14px', color: '#94a3b8' }} />
<input
type={showPassword ? 'text' : 'password'}
name="password"
required
value={formData.password}
onChange={handleChange}
placeholder="••••••••"
style={{
width: '100%',
padding: '12px 42px 12px 42px',
borderRadius: '12px',
border: '1px solid #cbd5e1',
fontSize: '0.9rem',
outline: 'none',
transition: 'all 0.2s ease',
boxSizing: 'border-box',
backgroundColor: '#f8fafc',
}}
onFocus={(e) => {
e.target.style.borderColor = '#2563eb';
e.target.style.backgroundColor = '#ffffff';
e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.1)';
}}
onBlur={(e) => {
e.target.style.borderColor = '#cbd5e1';
e.target.style.backgroundColor = '#f8fafc';
e.target.style.boxShadow = 'none';
}}
/>
<button
type="button"
onClick={() => setShowPassword(!showPassword)}
style={{
position: 'absolute',
right: '12px',
background: 'none',
border: 'none',
color: '#94a3b8',
cursor: 'pointer',


padding: '4px',
display: 'flex',
alignItems: 'center',
}}
>
{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
</div>
</div>


<button
type="submit"
disabled={loading}
style={{
width: '100%',
padding: '14px',
borderRadius: '12px',
border: 'none',
background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
color: '#ffffff',
fontSize: '0.95rem',
fontWeight: '700',
cursor: loading ? 'not-allowed' : 'pointer',
marginTop: '0.5rem',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
gap: '8px',
boxShadow: '0 8px 20px rgba(37, 99, 235, 0.25)',
transition: 'all 0.2s ease',
opacity: loading ? 0.8 : 1,
}}
onMouseEnter={(e) => {
if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
}}
onMouseLeave={(e) => {
if (!loading) e.currentTarget.style.transform = 'translateY(0)';
}}
>
<span>{loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Create Account'}</span>
{!loading && <ArrowRight size={18} />}
</button>
</form>


<div
style={{
marginTop: '2rem',
paddingTop: '1rem',
borderTop: '1px solid #f1f5f9',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
gap: '6px',
color: '#94a3b8',
fontSize: '0.75rem',
}}
>
<ShieldCheck size={16} style={{ color: '#10b981' }} />
<span>Secure & Encrypted Patient Data</span>
</div>

</div>
</div>
);
};

export default Auth;
