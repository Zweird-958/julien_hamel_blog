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
