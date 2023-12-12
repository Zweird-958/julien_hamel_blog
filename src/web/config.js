import { ZodError, z } from "zod"

const validationSchema = z.object({
  pagination: z.object({
    limit: z.number().int().positive().default(10),
  }),
  security: z.object({
    session: z.object({
      cookie: z.object({
        key: z.string(),
        secure: z.boolean(),
      }),
    }),
  }),
})
let config = null

try {
  config = validationSchema.parse({
    pagination: {
      limit: 10,
    },
    security: {
      session: {
        cookie: {
          key: "sessionJsonWebToken",
          secure: process.env.NODE_ENV !== "development",
        },
      },
    },
  })
} catch (err) {
  if (!(err instanceof ZodError)) {
    throw err
  }

  // eslint-disable-next-line no-console
  console.error(
    `Error: Missing values for config\n\t${err.errors.join("\n\t")}`.trim(),
  )
  process.exit(1)
}

export default config
