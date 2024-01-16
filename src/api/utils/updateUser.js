const updateUser = async (
  { query, user },
  { username, email, roleId, passwordHash, passwordSalt, disabled },
) => {
  await query
    .clone()
    .patch({
      roleId: roleId || user.roleId,
      username: username || user.username,
      email: email || user.email,
      passwordHash: passwordHash || user.passwordHash,
      passwordSalt: passwordSalt || user.passwordSalt,
      disabled: disabled !== null ? disabled : user.disabled,
    })
    .where("id", user.id)

  const userUpdated = await query
    .clone()
    .modify("format")
    .where("id", user.id)
    .first()

  return userUpdated
}

export default updateUser
