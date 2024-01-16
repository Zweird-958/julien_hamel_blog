import { HttpDuplicateError } from "@/api/errors"
import admin from "@/api/middlewares/admin"
import auth from "@/api/middlewares/auth"
import filterInput from "@/api/middlewares/filterInput"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import genSessionCookies from "@/api/utils/genSessionCookies"
import isDuplicatedUser from "@/api/utils/isDuplicatedUser"
import signUserToken from "@/api/utils/signUserToken"
import updatePassword from "@/api/utils/updatePassword"
import updateUser from "@/api/utils/updateUser"
import {
  disabledValidator,
  emailValidator,
  idValidator,
  passwordValidator,
  roleValidator,
  usernameValidator,
} from "@/utils/validators"
import { z } from "zod"

const handler = mw({
  PATCH: [
    validate({
      body: z.object({
        disabled: disabledValidator.optional(),
        role: roleValidator.optional(),
        username: usernameValidator.optional(),
        email: emailValidator.optional(),
        currentPassword: passwordValidator.optional(),
        newPassword: passwordValidator.optional(),
      }),
      query: z.object({
        userId: idValidator,
      }),
    }),
    auth,
    filterInput,
    async ({
      res,
      send,
      models: { UserModel },
      user,
      input: {
        disabled,
        userId,
        role,
        username,
        email,
        currentPassword,
        newPassword,
      },
    }) => {
      const query = UserModel.query()
      const id = userId || user.id
      const userToUpdate = await query.clone().findById(id).throwIfNotFound()
      const [isDuplicated, field] = await isDuplicatedUser(
        { email, username },
        userToUpdate,
        query,
      )

      if (isDuplicated) {
        throw new HttpDuplicateError(field)
      }

      const userPasswordUpdated = await updatePassword(
        { newPassword, currentPassword },
        user,
        query,
      )

      if (userPasswordUpdated) {
        send(userPasswordUpdated)

        return
      }

      const userUpdated = await updateUser(
        { query, id, fetchUser: true, user: userToUpdate },
        { roleId: role, username, email, disabled },
      )

      if (user.id === id && username) {
        const { jwt, cookieJwt } = signUserToken(userUpdated)

        res.setHeader("set-cookie", genSessionCookies(cookieJwt))
        send(jwt)

        return
      }

      send(userUpdated)
    },
  ],
  DELETE: [
    validate({
      query: z.object({
        userId: idValidator,
      }),
    }),
    auth,
    admin,
    async ({ send, input: { userId }, models: { UserModel } }) => {
      await UserModel.query().softDelete(userId)

      await send(true)
    },
  ],
})

export default handler
