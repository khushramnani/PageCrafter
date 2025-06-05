import { z } from "zod";



export const newUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords does not match",
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const updateUserSchema = z.object({
  username: z.string().min(1, "Username is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  profilePicture: z.string().url("Invalid URL").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long").optional(),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
});