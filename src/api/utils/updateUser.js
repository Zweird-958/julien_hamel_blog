const updateUser = async (
  { query, fetchUser, id },
  { username, email, roleId, passwordHash, passwordSalt },
) => {
  await query
    .clone()
    .patch({
      roleId,
      username,
      email,
      passwordHash,
      passwordSalt,
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
