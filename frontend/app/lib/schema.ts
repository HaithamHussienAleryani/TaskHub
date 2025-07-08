import z from "zod";
export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
});

// signup schema
export const signUpSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required").min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string().nonempty("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
  ,
  confirmPassword: z
    .string()
    .nonempty("Confirm password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be at most 100 characters long")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
