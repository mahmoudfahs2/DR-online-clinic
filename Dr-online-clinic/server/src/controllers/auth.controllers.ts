import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_2026';


export const register = async (req: Request, res: Response) => {
try {
const { name, email, password, role } = req.body;

if (!name ||!email|| !password) {
return res.status(400).json({ message: 'All fields are required' });
}

const existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(400).json({ message: 'User already exists' });
}


const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const newUser = new User({
name,
email,
password: hashedPassword,
role: role || 'patient',
});

await newUser.save();

const token = jwt.sign(
{ id: newUser._id, role: newUser.role },
JWT_SECRET,
{ expiresIn: '7d' }
);

res.status(201).json({
token,
user: {
id: newUser._id,
name: newUser.name,
email: newUser.email,
role: newUser.role,
},
});
} catch (error) {
res.status(500).json({ message: 'Server error during registration', error });
}
};


export const login = async (req: Request, res: Response) => {
try {
const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({ message: 'Please provide email and password' });
}

const user = await User.findOne({ email });
if (!user) {
return res.status(400).json({ message: 'Invalid credentials' });
}


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(400).json({ message: 'Invalid credentials' });
}


const token = jwt.sign(
{ id: user._id, role: user.role },
JWT_SECRET,
{ expiresIn: '7d' }
);

res.status(200).json({
token,
user: {
id: user._id,
name: user.name,
email: user.email,
role: user.role,
},
});
} catch (error) {
res.status(500).json({ message: 'Server error during login', error });
}
};