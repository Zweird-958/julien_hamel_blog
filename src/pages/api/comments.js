import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { commentSchema } from "@/utils/schemas"
import { idValidator, pageValidator } from "@/utils/validators"
import { z } from "zod"

const handler = mw({
  GET: [
    validate({
      query: z.object({
        page: pageValidator,
        postId: idValidator.optional(),
        authorId: idValidator.optional(),
      }),
    }),
    async ({
      send,
      models: { CommentModel },
      input: { page, postId, authorId },
    }) => {
      const filters = { postId, authorId }
      let query = CommentModel.query().modify("active")
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          query = query.where(key, value)
        }
      })
      const comments = await query
        .clone()
        .withGraphFetched("author")
        .orderBy("updatedAt", "desc")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(comments, { count })
    },
  ],
  POST: [
    validate({
      body: commentSchema,
      query: z.object({
        postId: idValidator,
      }),
    }),
    auth,
    async ({
      send,
      models: { CommentModel },
      input: { comment, postId },
      user,
    }) => {
      const newComment = await CommentModel.query().insert({
        content: comment,
        authorId: user.id,
        postId,
      })

      send(newComment)
    },
  ],
})

export default handler
