import { Router } from "express";
import {
createAppointment,
getAppointments,
updateAppointmentStatus,
} from "../controllers/appointment.controller";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.patch("/:id/status", updateAppointmentStatus);

export default router