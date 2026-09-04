import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar" style={{ padding: "1rem", borderBottom: "1px solid #ddd", display: "flex", gap: "1rem" }}>
      <Link to="/" style={{ fontWeight: "bold", textDecoration: "none" }}>MediLink Clinic</Link>
      <Link to="/doctors" style={{ textDecoration: "none" }}>Find Doctors</Link>
    </nav>
  );
};

export default Navbar;