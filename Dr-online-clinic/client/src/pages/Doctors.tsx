import { useEffect, useState } from "react";
import DrCard from "../components/DoctorCard";

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

function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError("Unable to load doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="doctors-page">
        <h1>Find a doctor</h1>
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctors-page">
        <h1>Find a doctor</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="doctors-page">
      <h1>Find a doctor</h1>

      <div className="doctors-list">
        {doctors.map((doctor) => (
          <DrCard
            key={doctor._id}
            id={doctor._id} /* تم إضافة التمرير هنا */
            name={doctor.name}
            specialty={doctor.specialty}
            image={doctor.image}
            rating={doctor.rating}
            yearsInPractice={doctor.yearsInPractice}
            visitLength={doctor.visitLength}
            availableTime={doctor.availableTime}
          />
        ))}
      </div>
    </div>
  );
}

export default Doctors;
