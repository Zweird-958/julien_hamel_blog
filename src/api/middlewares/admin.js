import { HttpForbiddenError } from "@/api/errors"

const admin = async ({ next, user }) => {
  const {
    role: { name: roleName },
  } = user

  if (roleName !== "admin") {
    throw new HttpForbiddenError()
  }

  await next()
}

export default admin
