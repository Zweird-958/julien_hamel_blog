import getRole from "@/utils/getRole"

const isAdmin = (user) => getRole(user) === "admin"

export default isAdmin
