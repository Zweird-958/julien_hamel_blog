import { HttpForbiddenError, HttpNotFoundError } from "@/api/errors"
import auth from "@/api/middlewares/auth"
import author from "@/api/middlewares/author"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import isAdmin from "@/utils/isAdmin"
import {
  contentValidator,
  idValidator,
  titleValidator,
} from "@/utils/validators"
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
  PATCH: [
    auth,
    author,
    validate({
      query: z.object({
        postId: idValidator,
      }),
      body: z.object({
        title: titleValidator.optional(),
        content: contentValidator.optional(),
      }),
    }),
    async ({
      send,
      models: { PostModel },
      user,
      input: { postId, title, content },
    }) => {
      const query = PostModel.query()
      const post = await query.clone().findById(postId)

      if (!post) {
        throw new HttpNotFoundError()
      }

      if (user.id !== post.authorId && !isAdmin(user)) {
        throw new HttpForbiddenError()
      }

      const postUpdated = await query.clone().patchAndFetchById(postId, {
        title,
        content,
      })

      send(postUpdated)
    },
  ],
})

export default handler
