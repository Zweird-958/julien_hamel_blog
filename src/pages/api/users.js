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
      const query = UserModel.query()
      const user = await query.clone().modify("insensitiveCase", username)

      if (user.length > 0) {
        throw new HttpDuplicateError("Username")
      }

      const userByEmail = await query.clone().findOne({ email })

      if (userByEmail) {
        send(true)

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await query.clone().insert({
        username,
        email,
        passwordHash,
        passwordSalt,
      })

      await send(true)
    },
  ],
  GET: [
    auth,
    admin,
    async ({ send, models: { UserModel } }) => {
      const users = await UserModel.query()
        .select(
          "username",
          "email",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "id",
        )
        .withGraphFetched("role")

      await send(users)
    },
  ],
})

export default handler