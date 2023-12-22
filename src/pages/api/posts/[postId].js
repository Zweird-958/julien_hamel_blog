import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { idValidator } from "@/utils/validators"
import { z } from "zod"

const handler = mw({
  GET: [
    validate({
      query: z.object({
        postId: idValidator,
      }),
    }),
    async ({ send, models: { PostModel }, input: { postId } }) => {
      const post = await PostModel.query()
        .withGraphFetched("author")
        .findOne({ id: postId })

      send(post)
    },
  ],
})

export default handler
