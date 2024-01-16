import isAdmin from "@/utils/isAdmin"

const filterInput = async (ctx) => {
  const { input, user, next } = ctx

  if (!isAdmin(user)) {
    ctx.input = { ...input, email: null, disabled: null, role: null }
  }

  await next()
}

export default filterInput
