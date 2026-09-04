export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  languages: string[];
  image: string;
  description: string;
  available: boolean;
  nextAvailable: string;
}
