import { HttpArgumentsError } from "@/api/errors"
import { ZodError } from "zod"
import merge from "deepmerge"

const validate =
  ({ query: queryValidator, body: bodyValidator }) =>
  async (ctx) => {
    const { req, next } = ctx

    try {
      const query = queryValidator
        ? await queryValidator.parseAsync(req.query || {})
        : {}
      const body = bodyValidator
        ? await bodyValidator.parseAsync(req.body || {})
        : {}
      const input = merge(query, body)
      ctx.input ||= input

      await next()
    } catch (err) {
      if (err instanceof ZodError) {
        throw new HttpArgumentsError(err.errors)
      }

      throw err
    }
  }

export default validate
