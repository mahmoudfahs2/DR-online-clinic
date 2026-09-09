import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientName: string;
  patientEmail: string;
  doctorId: mongoose.Types.ObjectId;
  date: string;
  timeSlot: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model<IAppointment>("Appointment", appointmentSchema);
export default Appointment;
