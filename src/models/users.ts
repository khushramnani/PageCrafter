import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  isVerified: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture: string;
  clerkId: string;
  credits: number;
}

const userSchema = new Schema<User>(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: false },
    isVerified: { type: Boolean, default: false },
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
