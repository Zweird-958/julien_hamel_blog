const isAdmin = (user) => {
  const {
    role: { name: roleName },
  } = user

  return roleName === "admin"
}

export default isAdmin
