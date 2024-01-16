import { AVERAGE_PASSWORD_HASHING_DURATION } from "@/api/constants"
import { HttpAuthenticationError } from "@/api/errors"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import genSessionCookies from "@/api/utils/genSessionCookies"
import signUserToken from "@/api/utils/signUserToken"
import hashPassword from "@/db/hashPassword"
import sleep from "@/utils/sleep"
import { emailValidator } from "@/utils/validators"
import { z } from "zod"

const handle = mw({
  POST: [
    validate({
      body: z.object({
        email: emailValidator,
        password: z.string(),
      }),
    }),
    async ({
      send,
      res,
      input: { email, password },
      models: { UserModel },
    }) => {
      const sanitizedEmail = email.toLowerCase()
      const user = await UserModel.query()
        .active()
        .withGraphFetched("role")
        .findOne({ email: sanitizedEmail, disabled: false })

      if (!user) {
        await sleep(AVERAGE_PASSWORD_HASHING_DURATION)

        throw new HttpAuthenticationError()
      }

      const [passwordHash] = await hashPassword(password, user.passwordSalt)

      if (passwordHash !== user.passwordHash) {
        throw new HttpAuthenticationError()
      }

      const { jwt, cookieJwt } = signUserToken(user)

      res.setHeader("set-cookie", genSessionCookies(cookieJwt))
      send(jwt)
    },
  ],
  DELETE: [
    auth,
    ({ send, res }) => {
      res.setHeader("set-cookie", genSessionCookies("null"))
      send(true)
    },
  ],
})

export default handle
