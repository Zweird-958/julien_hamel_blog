import { HttpDuplicateError, HttpForbiddenError } from "@/api/errors"
import admin from "@/api/middlewares/admin"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import canEditUser from "@/api/utils/canEditUser"
import isAdmin from "@/utils/isAdmin"
import {
  emailValidator,
  idValidator,
  roleValidator,
  usernameValidator,
} from "@/utils/validators"
import { z } from "zod"

const handler = mw({
  PATCH: [
    validate({
      body: z.object({
        disable: z.boolean().optional(),
        role: roleValidator.optional(),
        username: usernameValidator.optional(),
        email: emailValidator.optional(),
      }),
      query: z.object({
        userId: idValidator,
      }),
    }),
    auth,
    // eslint-disable-next-line complexity
    async ({
      send,
      models: { UserModel },
      user,
      input: { disable, userId, role, username, email },
    }) => {
      if (!canEditUser(user, userId, disable)) {
        throw new HttpForbiddenError()
      }

      const query = UserModel.query()
      const id = userId || user.id

      if (disable) {
        const userUpdated = await query
          .clone()
          .updateAndFetchById(id, { disabled: true })

        send(userUpdated)

        return
      }

      const userToUpdate = await query.clone().findById(id).throwIfNotFound()

      if (username !== userToUpdate.username) {
        const users = await query.clone().modify("insensitiveCase", username)

        if (users.length > 0) {
          throw new HttpDuplicateError("Username")
        }
      }

      const sanitizedEmail = email && email.toLowerCase()

      if (email !== userToUpdate.email) {
        const users = await query.clone().where("email", sanitizedEmail)

        if (users.length > 0) {
          throw new HttpDuplicateError("Email")
        }
      }

      await query
        .clone()
        .update({
          roleId: role && isAdmin(user) ? role : userToUpdate.role,
          username: username || userToUpdate.username,
          email: sanitizedEmail || userToUpdate.email,
        })
        .where("id", id)
      const userUpdated = await query.clone().modify("format").where("id", id)

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
