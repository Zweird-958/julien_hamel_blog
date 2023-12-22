import { z } from "zod"

export const emailValidator = z
  .string()
  .min(1, { message: "Email is required" })
  .email()
export const passwordValidator = z
  .string()
  .min(1, { message: "Password is required" })
export const usernameValidator = z
  .string()
  .min(1, { message: "Username is required" })
export const titleValidator = z
  .string()
  .min(1, { message: "Title is required" })
export const contentValidator = z
  .string()
  .min(1, { message: "Content is required" })
export const idValidator = z.string()
export const pageValidator = z.string().default("1").optional()
