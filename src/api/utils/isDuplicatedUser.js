const isDuplicatedUser = async ({ email, username }, userToUpdate, query) => {
  if (username && username !== userToUpdate.username) {
    const users = await query.clone().modify("insensitiveCase", username)

    if (users.length > 0) {
      return [true, "username"]
    }
  }

  if (email && email !== userToUpdate.email) {
    const users = await query.clone().where("email", email)

    if (users.length > 0) {
      return [true, "email"]
    }
  }

  return [false, null]
}

export default isDuplicatedUser
