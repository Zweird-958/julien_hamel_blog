import { HttpDuplicateError, HttpForbiddenError } from "@/api/errors"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
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
      const sanitizedEmail = email.toLowerCase()

      if (user.id !== userId && !isAdmin(user)) {
        throw new HttpForbiddenError()
      }

      if (user.id === userId && disable) {
        throw new HttpForbiddenError()
      }

      const query = UserModel.query()
      const id = userId || user.id

      if (disable) {
        const userUpdated = await query.clone().softDelete(id)

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

      if (email !== userToUpdate.email) {
        const users = await query.clone().where("email", sanitizedEmail)

        if (users.length > 0) {
          throw new HttpDuplicateError("Email")
        }
      }

      const userUpdated = await query.clone().updateAndFetchById(id, {
        roleId: role ? parseInt(role, 10) : userToUpdate.role,
        username: username || userToUpdate.username,
        email: sanitizedEmail || userToUpdate.email,
      })

      send("hello")
    },
  ],
})

export default handler
