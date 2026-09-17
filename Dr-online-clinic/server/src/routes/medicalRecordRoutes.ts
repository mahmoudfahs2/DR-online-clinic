import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import MedicalRecord from '../models/MedicalRecords';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.get('/',  authenticateToken,async (req: Request, res: Response) => {
  try {
    const records = await MedicalRecord.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medical records', error });
  }
});


router.post('/',  authenticateToken, upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { title, category, doctorName, date } = req.body;
    const file = req.file;

 
    let calculatedSize = '1.2 MB';
    if (file) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      calculatedSize = `${sizeInMB} MB`;
    }

    const newRecord = new MedicalRecord({
      title,
      category,
      doctorName,
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileSize: calculatedSize,
      fileUrl: file ? `http://localhost:5000/uploads/${file.filename}` : '',
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: 'Error creating medical record', error });
  }
});


router.delete('/:id',authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await MedicalRecord.findByIdAndDelete(id);
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error });
  }
});

export default router;
