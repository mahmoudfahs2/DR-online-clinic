import { Request, Response } from 'express';
import Appointment from '../models/Appointment';

export const getAppointments = async (req: Request, res: Response) => {
try {
const appointments = await Appointment.find().sort({ createdAt: -1 });
res.status(200).json(appointments);
} catch (error) {
res.status(500).json({ message: 'Error fetching appointments', error });
}
};


export const createAppointment = async (req: Request, res: Response) => {
try {
const { patientName, doctorName, date, time, reason } = req.body;

if (!patientName|| !doctorName ||!date || !time) {
return res.status(400).json({ message: 'Please fill all required fields' });
}

const newAppointment = new Appointment({
patientName,
doctorName,
date,
time,
reason,
});

const savedAppointment = await newAppointment.save();
res.status(201).json(savedAppointment);
} catch (error) {
res.status(500).json({ message: 'Error creating appointment', error });
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

if (!updated) {
return res.status(404).json({ message: 'Appointment not found' });
}

res.status(200).json(updated);
} catch (error) {
res.status(500).json({ message: 'Error updating appointment status', error });
}
};


export const deleteAppointment = async (req: Request, res: Response) => {
try {
const { id } = req.params;
await Appointment.findByIdAndDelete(id);
res.status(200).json({ message: 'Appointment deleted successfully' });
} catch (error) {
res.status(500).json({ message: 'Error deleting appointment', error });
}
};