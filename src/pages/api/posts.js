import auth from "@/api/middlewares/auth"
import author from "@/api/middlewares/author"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { createPostSchema } from "@/utils/schemas"
import { pageValidator } from "@/utils/validators"
import { z } from "zod"

const handler = mw({
  POST: [
    auth,
    author,
    validate({
      body: createPostSchema,
    }),
    async ({
      send,
      input: { title, content },
      models: { PostModel },
      user,
    }) => {
      const post = await PostModel.query().insert({
        title,
        content,
        authorId: user.id,
      })

      send(post)
    },
  ],
  GET: [
    validate({
      query: z.object({
        page: pageValidator,
      }),
    }),
    async ({ send, models: { PostModel }, input: { page } }) => {
      const query = PostModel.query()
      const posts = await query
        .clone()
        .withGraphFetched("author")
        .orderBy("updatedAt", "desc")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(posts, { count })
    },
  ],
})

export default handler
