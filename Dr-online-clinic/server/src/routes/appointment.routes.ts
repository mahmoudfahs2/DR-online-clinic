import express from 'express';
import {
getAppointments,
createAppointment,
updateAppointmentStatus,
deleteAppointment,
} from '../controllers/appointment.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/',authenticateToken, getAppointments);
router.post('/',authenticateToken, createAppointment);
router.patch('/:id/status',authenticateToken, updateAppointmentStatus);
router.delete('/:id',authenticateToken, deleteAppointment);

export default router;