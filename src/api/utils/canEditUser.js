import isAdmin from "@/utils/isAdmin"

const canEditUser = (user, userId, disable) =>
  (user.id !== userId && isAdmin(user)) || (user.id === userId && !disable)

export default canEditUser
