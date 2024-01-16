const updateUser = async (
  { query, fetchUser, id, user },
  { username, email, roleId, passwordHash, passwordSalt },
) => {
  await query
    .clone()
    .patch({
      roleId: roleId || user.roleId,
      username: username || user.username,
      email: email || user.email,
      passwordHash: passwordHash || user.passwordHash,
      passwordSalt: passwordSalt || user.passwordSalt,
    })
    .where("id", id)

  if (!fetchUser) {
    return null
  }

  const userUpdated = await query
    .clone()
    .modify("format")
    .where("id", id)
    .first()

  return userUpdated
}

export default updateUser
