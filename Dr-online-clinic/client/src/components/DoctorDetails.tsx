import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  rating: number;
  yearsInPractice: number;
  availableTime: string;
  image: string;
}

export const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

useEffect(() => {
if (id) {
fetch(`http://localhost:5000/api/doctors/${id}`)
.then((res) => res.json())
.then((data) => setDoctor(data))
.catch((err) => console.error("Error fetching doctor:", err));
}
}, [id]);


  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName||  !appointmentDate || !appointmentTime) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: id,
          patientName,
          patientEmail,
          date: appointmentDate,
          time: appointmentTime,
        }),
      });

      if (response.ok) {
        setMessage("Appointment booked successfully!");
        setTimeout(() => {
          navigate("/appointments");
        }, 1500);
      } else {
        setMessage("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return <p style={{ padding: "1rem" }}>Loading doctor details...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "1.5rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ padding: "0.4rem 0.8rem", cursor: "pointer", marginBottom: "1rem", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#f9f9f9" }}
      >
        ← Back
      </button>

      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
        <img
          src={doctor.image}
          alt={doctor.name}
          style={{ width: "120px", height: "120px", borderRadius: "8px", objectFit: "cover" }}
        />
        <div>
          <h2 style={{ margin: "0 0 0.5rem 0", color: "#111827" }}>{doctor.name}</h2>
          <p style={{ margin: "0 0 0.25rem 0", color: "#4b5563" }}><strong>Specialty:</strong> {doctor.specialty}</p>
          <p style={{ margin: "0 0 0.25rem 0", color: "#4b5563" }}><strong>Rating:</strong> {doctor.rating} / 5</p>
          <p style={{ margin: "0 0 0.25rem 0", color: "#4b5563" }}><strong>Experience:</strong> {doctor.yearsInPractice} years</p>
          <p style={{ margin: 0, color: "#2563eb" }}><strong>Next Available:</strong> {doctor.availableTime}</p>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "1.5rem 0" }} />

     
      <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: 0, color: "#1f2937" }}>Book Your Appointment</h3>
{message && (
          <div style={{ padding: "0.75rem", borderRadius: "6px", backgroundColor: message.includes("success") ? "#dcfce7" : "#fee2e2", color: message.includes("success") ? "#15803d" : "#b91c1c", fontSize: "0.9rem" }}>
            {message}
          </div>
        )}

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem", color: "#374151" }}>Your Full Name</label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="John Doe"
            style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem", color: "#374151" }}>Email Address</label>
          <input
            type="email"
            required
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            placeholder="patient@example.com"
            style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem", color: "#374151" }}>Date</label>
            <input
              type="date"
              required
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem", color: "#374151" }}>Time Slot</label>
            <input
              type="time"
              required
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default DoctorDetails;
