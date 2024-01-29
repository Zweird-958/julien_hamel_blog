import { z } from "zod"

export const emailValidator = z
  .string()
  .min(1, { message: "Email is required" })
  .toLowerCase()
  .email()
export const passwordValidator = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine(
    (password) =>
      /(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u.test(password),
    {
      message:
        "Must contain: 1 lower & 1 upper letters, 1 digit and 1 spe. char.",
    },
  )
export const usernameValidator = z
  .string()
  .min(1, { message: "Username is required" })
export const titleValidator = z
  .string()
  .min(1, { message: "Title is required" })
export const contentValidator = z
  .string()
  .min(1, { message: "Content is required" })
export const idValidator = z.string().uuid()
export const pageValidator = z.coerce.number().optional().default(1)
export const commentValidator = z
  .string()
  .min(1, { message: "Comment is required" })
export const roleValidator = z.coerce.number()
export const disabledValidator = z.boolean()
