import { HttpDuplicateError } from "@/api/errors"
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
      const user = await UserModel.query().modify("insensitiveCase", username)

      if (user.length > 0) {
        throw new HttpDuplicateError("Username")
      }

      const userByEmail = await UserModel.query().findOne({ email })

      if (userByEmail) {
        send(true)

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insert({
        username,
        email,
        passwordHash,
        passwordSalt,
      })

      await send(true)
    },
  ],
})

export default handler
