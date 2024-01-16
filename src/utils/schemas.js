import {
  commentValidator,
  contentValidator,
  emailValidator,
  idValidator,
  passwordValidator,
  roleValidator,
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
export const commentSchema = z.object({
  comment: commentValidator,
})
export const userSchema = z.object({
  role: roleValidator,
  id: idValidator,
  username: usernameValidator,
  email: emailValidator,
})
