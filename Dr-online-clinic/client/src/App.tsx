import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Doctors from "./pages/Doctors";
import {DoctorDetails}from "./components/DoctorDetails";
import "./App.css";

function App() {
  return (
    <div className="app-container" style={{ display: "flex", minHeight: "100vh" }}>
    
      <Navbar />

      
      <div style={{ flex: 1, marginLeft: "240px", backgroundColor: "#f9fafb" }}>
        
 
        <header style={{
          height: "60px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "between",
          padding: "0 2rem"
        }}>
          <input
            type="text"
            placeholder="Search doctors, specialties..."
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              width: "300px",
              outline: "none"
            }}
          />
        </header>

      
        <main className="content" style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Doctors />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

