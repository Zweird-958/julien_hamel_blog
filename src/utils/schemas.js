import {
  emailValidator,
  passwordValidator,
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
