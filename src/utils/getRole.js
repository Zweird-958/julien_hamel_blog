const getRole = (user) => {
  if (!user) {
    return null
  }

  const {
    role: { name: roleName },
  } = user

  return roleName
}

export default getRole
