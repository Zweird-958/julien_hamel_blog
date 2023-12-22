import auth from "@/api/middlewares/auth"
import author from "@/api/middlewares/author"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { createPostSchema } from "@/utils/schemas"

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
    async ({ send, models: { PostModel } }) => {
      const posts = await PostModel.query()
        .withGraphFetched("author")
        .orderBy("updatedAt", "desc")

      send(posts)
    },
  ],
})

export default handler
