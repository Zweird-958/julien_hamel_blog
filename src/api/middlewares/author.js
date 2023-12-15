import { HttpForbiddenError } from "@/api/errors"

const author = async ({ next, user }) => {
  const {
    role: { name: roleName },
  } = user

  if (roleName !== "admin" && roleName !== "author") {
    throw new HttpForbiddenError()
  }

  await next()
}

export default author
