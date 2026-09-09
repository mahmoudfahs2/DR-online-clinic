import { Request, Response } from "express";
import Appointment from "../models/Appointment";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: "Failed to book appointment", error });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update status" });
  }
};
