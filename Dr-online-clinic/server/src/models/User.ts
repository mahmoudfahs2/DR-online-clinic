import mongoose,{Schema,Document} from "mongoose";
export interface IUser extends
Document{
    name:string;
    email:string;
    password?:string;
    role:"patient"|"doctor";

}
const userSchema = new Schema<IUser>(
{
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, enum: ["patient", "doctor"], default: "patient" },
},
{ timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;