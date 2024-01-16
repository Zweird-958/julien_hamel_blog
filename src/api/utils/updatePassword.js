import { HttpAuthenticationError } from "@/api/errors"
import updateUser from "@/api/utils/updateUser"
import hashPassword from "@/db/hashPassword"

const updatePassword = async (
  { newPassword, currentPassword },
  user,
  query,
) => {
  if (newPassword) {
    const [passwordHash] = await hashPassword(
      currentPassword,
      user.passwordSalt,
    )

    if (passwordHash !== user.passwordHash) {
      throw new HttpAuthenticationError()
    }

    const [newPasswordHash, passwordSalt] = await hashPassword(newPassword)

    await updateUser(
      { query, id: user.id },
      { passwordHash: newPasswordHash, passwordSalt },
    )
  }

  return null
}

export default updatePassword
