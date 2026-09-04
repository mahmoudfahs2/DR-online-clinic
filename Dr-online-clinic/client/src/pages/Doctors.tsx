
import DrCard from "../components/DoctorCard";
function Doctors() {
  return (
    <div className="doctors-page">
        <h1>Find a doctor</h1>
        <div className="doctors-list">
                <DrCard
          name="Dr. maya"
          specialty="Board-certified family physician focused on preventive healthcare."
          image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
          rating={4.9}
          yearsInPractice={12}
          visitLength={30}
          availableTime="Today, 03:30 PM"
        />
         <DrCard
          name="Dr. John "
          specialty="Experienced internal medicine physician focused on patient care."
          image="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80"
          rating={4.0}
          yearsInPractice={10}
          visitLength={30}
          availableTime="Today, 04:00 PM"
        />
         
         <DrCard
          name="Dr. Ahmad "
          specialty="Experienced internal medicine physician focused on patient care."
          image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
          rating={3.8}
          yearsInPractice={10}
          visitLength={30}
          availableTime="Today, 04:00 PM"
        />

        </div>
    </div>
  );
}
export default Doctors;