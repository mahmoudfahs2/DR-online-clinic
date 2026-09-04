

type DrCardProps = {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  yearsInPractice: number;
  visitLength: number;
  availableTime: string;
};

function DoctorCard({
  name,
  specialty,
  image,
  rating,
  yearsInPractice,
  visitLength,
  availableTime,
}: DrCardProps) {
  return (
    <div className="doctor-card">
      <div className="doctor-image-container">
        <img src={image} alt={name} />
      </div>

      <div className="doctor-info">
        <div className="doctor-name">
          <h2>{name}</h2>
          <span className="verified">✓</span>
        </div>

        <p className="doctor-specialty">{specialty}</p>

        <div className="doctor-details">
          <div>
            <span>Rating</span>
            <strong>{rating} / 5</strong>
          </div>

          <div>
            <span>Years in practice</span>
            <strong>{yearsInPractice} years</strong>
          </div>

          <div>
            <span>Visit length</span>
            <strong>{visitLength} minutes</strong>
          </div>
        </div>

        <div className="availability">
          <span>Next available</span>
          <strong>{availableTime}</strong>
        </div>

        <button className="book-button">Book a visit →</button>
      </div>
    </div>
  );
}

export default DoctorCard;
