import { z } from "zod";

export const zodNewProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  type: z.enum(["landing", "email", "resume"]),
  method: z.enum(["ai", "scratch"]), 
  prompt: z.string().optional(), 
});

export const zodUpdateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").optional(),
  thumbnail: z.string().url("Invalid URL").optional(),
});