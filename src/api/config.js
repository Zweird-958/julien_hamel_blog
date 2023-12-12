import knexfile from "@@/knexfile.mjs"
import { ZodError, z } from "zod"

const validationSchema = z.object({
  db: z.object({
    client: z.enum(["pg"]),
    connection: z.string(),
  }),
  security: z.object({
    jwt: z.object({
      secret: z.string(),
      expiresIn: z.string(),
    }),
  }),
})

let config = null

try {
  config = validationSchema.parse({
    db: knexfile,
    security: {
      jwt: {
        secret: process.env.SECURITY__JWT__SECRET,
        expiresIn: "2 days",
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
