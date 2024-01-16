const isDuplicatedUser = async ({ email, username }, userToUpdate, query) => {
  if (username && username !== userToUpdate.username) {
    const user = await query.clone().modify("insensitiveCase", username).first()

    if (user) {
      return [true, "username"]
    }
  }

  if (email && email !== userToUpdate.email) {
    const user = await query.clone().where("email", email).first()

    if (user) {
      return [true, "email"]
    }
  }

  return [false, null]
}

export default isDuplicatedUser
