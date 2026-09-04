import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(1),
  specialty: z.string().min(1),
  image: z.string().url(),
  rating: z.number().min(0).max(5),
  yearsInPractice: z.number().min(0),
  visitLength: z.number().min(1),
  availableTime: z.string().min(1),
});