import { Request, Response } from "express";
import Doctor from "../models/Doctor";

export const getDoctors = async (
  req: Request,
  res: Response
) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get doctors",
    });
  }
};

export const getDoctorById = async (
  req: Request,
  res: Response
) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get doctor",
    });
  }
};