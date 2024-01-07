import getRole from "@/utils/getRole"
import isAdmin from "@/utils/isAdmin"

const isAuthor = (user) => getRole(user) === "author" || isAdmin(user)

export default isAuthor
