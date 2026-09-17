import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicalRecord extends Document {
user: mongoose.Types.ObjectId;
title: string;
category: 'lab' | 'prescription' | 'scan' | 'general';
doctorName: string;
date: string;
fileSize: string;
fileUrl?: string;
}

const MedicalRecordSchema: Schema = new Schema(
{
user: { type: Schema.Types.ObjectId, ref: 'User', required: false }, 
title: { type: String, required: true },
category: { 
type: String, 
enum: ['lab', 'prescription', 'scan', 'general'], 
required: true 
},
doctorName: { type: String, required: true },
date: { type: String, required: true },
fileSize: { type: String, default: '1.2 MB' },
fileUrl: { type: String, default: '' },
},
{ timestamps: true }
);

export default mongoose.model<IMedicalRecord>('MedicalRecord', MedicalRecordSchema);