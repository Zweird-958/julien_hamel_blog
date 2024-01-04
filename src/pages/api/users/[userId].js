import { HttpForbiddenError } from "@/api/errors"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import isAdmin from "@/utils/isAdmin"
import { idValidator } from "@/utils/validators"
import { z } from "zod"

const handler = mw({
  PATCH: [
    validate({
      body: z.object({
        disable: z.boolean().optional(),
      }),
      query: z.object({
        userId: idValidator,
      }),
    }),
    auth,
    async ({
      send,
      models: { UserModel },
      user,
      input: { disable, userId },
    }) => {
      if (user.id !== userId && !isAdmin(user)) {
        throw new HttpForbiddenError()
      }

      if (user.id === userId && disable) {
        throw new HttpForbiddenError()
      }

      const query = UserModel.query()

      if (disable) {
        const userUpdated = await query.clone().softDelete(userId || user.id)

        send(userUpdated)
      }

      send("hello")
    },
  ],
})

export default handler
