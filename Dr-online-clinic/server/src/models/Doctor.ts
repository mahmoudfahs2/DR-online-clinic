import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  yearsInPractice: number;
  visitLength: number;
  availableTime: string;
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
    },

    specialty: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    yearsInPractice: {
      type: Number,
      required: true,
    },

    visitLength: {
      type: Number,
      required: true,
    },

    availableTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;