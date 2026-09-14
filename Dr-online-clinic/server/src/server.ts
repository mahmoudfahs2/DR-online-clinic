import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database";
import doctorRoutes from "./routes/doctor.routes";
import appointmentRoutes from "./routes/appointment.routes";
import authRoutes from "./routes/auth.routes"; 

dotenv.config();

const app = express();


app.use(
cors({
origin: ["http://localhost:5173", "http://localhost:5174"],
credentials: true,
})
);

app.use(express.json());


connectDatabase();


app.get("/", (req, res) => {
res.json({ message: "Doctor API is running" });
});


app.use("/api/auth", authRoutes); 
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});