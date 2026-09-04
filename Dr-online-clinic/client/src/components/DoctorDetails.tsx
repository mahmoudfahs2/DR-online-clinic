import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Doctor = {
  _id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  yearsInPractice: number;
  visitLength: number;
  availableTime: string;
};

function DoctorDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDoctor(data);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading details...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Back
      </button>

      {doctor ? (
        <div className="doctor-details-container">
          <img src={doctor.image} alt={doctor.name} style={{ width: "200px", borderRadius: "10px" }} />
          <h2>{doctor.name}</h2>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Rating:</strong> {doctor.rating} / 5</p>
          <p><strong>Experience:</strong> {doctor.yearsInPractice} years</p>
          <p><strong>Available Time:</strong> {doctor.availableTime}</p>
          <button className="book-button" style={{ marginTop: "1rem" }}>
            Confirm Booking
          </button>
        </div>
      ) : (
        <p>Doctor not found.</p>
      )}
    </div>
  );
}

export default DoctorDetails;