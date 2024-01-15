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
      const query = PostModel.query().findOne({ id: postId })
      const post = await query.clone().withGraphFetched("author")
      await query.clone().increment("visits", 1)

      send(post)
    },
  ],
})

export default handler
