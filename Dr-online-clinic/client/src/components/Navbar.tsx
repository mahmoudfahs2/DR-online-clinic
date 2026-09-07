import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar: React.FC = () => {
const location = useLocation();

const navItems = [
{ label: "Dashboard", path: "/dashboard" },
{ label: "Find Doctors", path: "/doctors" },
{ label: "Appointments", path: "/appointments" },
{ label: "Medical Records", path: "/records" },
{ label: "Settings", path: "/settings" },
];

return (
<aside style={{
width: "240px",
height: "100vh",
backgroundColor: "#fff",
borderRight: "1px solid #e5e7eb",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
padding: "1.5rem 1rem",
position: "fixed",
left: 0,
top: 0
}}>
<div>

<div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#2563eb", marginBottom: "2rem", paddingLeft: "0.5rem" }}>
MediLink Clinic
</div>

{/* Links */}
<nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
{navItems.map((item) => {
const isActive = location.pathname === item.path || (item.path === "/doctors" && location.pathname === "/");
return (
<Link
key={item.label}
to={item.path}
style={{
padding: "0.75rem 1rem",
borderRadius: "8px",
textDecoration: "none",
fontSize: "0.95rem",
fontWeight: isActive ? "600" : "400",
color: isActive ? "#2563eb" : "#4b5563",
backgroundColor: isActive ? "#eff6ff" : "transparent",
transition: "all 0.2s"
}}
>
{item.label}
</Link>
);
})}
</nav>
</div>


<div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1rem", paddingLeft: "0.5rem" }}>
<p style={{ margin: 0, fontSize: "0.85rem", fontWeight: "bold", color: "#1f2937" }}>Patient Portal</p>
<span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Welcome back</span>
</div>
</aside>
);
};

export default Navbar;