import { HttpForbiddenError } from "@/api/errors"
import isAdmin from "@/utils/isAdmin"

const admin = async ({ next, user }) => {
  if (!isAdmin(user)) {
    throw new HttpForbiddenError()
  }

  await next()
}

export default admin
