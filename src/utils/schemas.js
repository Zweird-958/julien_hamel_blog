import {
  contentValidator,
  emailValidator,
  passwordValidator,
  titleValidator,
  usernameValidator,
} from "@/utils/validators"
import { z } from "zod"

export const singInSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
})
export const signUpSchema = singInSchema.extend({
  username: usernameValidator,
})
export const createPostSchema = z.object({
  title: titleValidator,
  content: contentValidator,
})
