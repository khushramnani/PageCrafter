import mongoose, { Schema, Document } from "mongoose";
import { date, string } from "zod/v4";

export interface User extends Document {
  email: string;
  username: string;
  isVerified: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture: string;
  credits: number;
  verifyCodeExpiry:Date;
  verifyCode: string
}

const userSchema = new Schema<User>(
  {
    
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: false },
    isVerified: { type: Boolean, required: false },
    verifyCode: {type: String , required:false },
    verifyCodeExpiry:{type:Date , required:false },
    profilePicture: { type: String, default: "" },
    credits: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const UserModal =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModal;
