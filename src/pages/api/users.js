import { HttpDuplicateError } from "@/api/errors"
import admin from "@/api/middlewares/admin"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import hashPassword from "@/db/hashPassword"
import { signUpSchema } from "@/utils/schemas"

const handler = mw({
  POST: [
    validate({
      body: signUpSchema,
    }),
    async ({
      send,
      input: { username, email, password },
      models: { UserModel },
    }) => {
      const sanitizedEmail = email.toLowerCase()
      const query = UserModel.query()
      const user = await query.clone().modify("insensitiveCase", username)

      if (user.length > 0) {
        throw new HttpDuplicateError("Username")
      }

      const userByEmail = await query.clone().findOne({ email: sanitizedEmail })

      if (userByEmail) {
        send(true)

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await query.clone().insert({
        username,
        email: sanitizedEmail,
        passwordHash,
        passwordSalt,
      })

      await send(true)
    },
  ],
  GET: [
    auth,
    admin,
    async ({ send, models: { UserModel }, user: { id } }) => {
      const users = await UserModel.query()
        .select(
          "username",
          "email",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "id",
        )
        .where("id", "!=", id)
        .withGraphFetched("role")

      await send(users)
    },
  ],
})

export default handler
