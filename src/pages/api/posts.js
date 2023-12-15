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
    async ({ send, input: { title, content }, models: { PostModel } }) => {
      const post = await PostModel.query().insert({
        title,
        content,
      })

      send(post)
    },
  ],
  GET: [
    async ({ send, models: { PostModel } }) => {
      const posts = await PostModel.query().orderBy("updatedAt", "desc")

      send(posts)
    },
  ],
})

export default handler
