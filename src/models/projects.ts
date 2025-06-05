import mongoose, { Schema, Document } from "mongoose";

export interface Project extends Document {
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
  slug: string;
  content: Record<string, any>;
  type: string;
  thumbnail?: string;
  htmloutput: string;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
}

const projectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    slug: { type: String, required: true, unique: true , sparse:true },
    content: { type: Schema.Types.Mixed, required: true },
    type: { type: String, required: true, enum: ["landing", "email", "resume"] },
    htmloutput: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ProjectModal =
  (mongoose.models.Project as mongoose.Model<Project>) ||
  mongoose.model<Project>("Project", projectSchema);

export default ProjectModal;
