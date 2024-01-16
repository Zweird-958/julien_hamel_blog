import {
  emailValidator,
  idValidator,
  roleValidator,
  usernameValidator,
} from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import Button from "@/web/components/ui/Button"
import Card from "@/web/components/ui/Card"
import Form from "@/web/components/ui/Form"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { z } from "zod"
// eslint-disable-next-line max-lines-per-function
const UserCard = (props) => {
  const { user, disableOnClick, roles, onSubmit, error, deleteUser } = props
  const {
    id,
    email,
    username,
    role: { id: roleId },
    disabled,
  } = user
  const userSchema = z.object({
    role: roleValidator,
    id: idValidator,
    username: usernameValidator,
    email: emailValidator,
  })
  const handleDeleteUser = () => {
    deleteUser(id)
  }

  return (
    <Card key={id}>
      <Button
        className="w-fit self-end"
        color="danger"
        onClick={handleDeleteUser}
      >
        Delete
      </Button>
      <Form
        schema={userSchema}
        defaultValues={{ role: roleId.toString(), id, username, email }}
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
        fields={[
          {
            label: "Role",
            name: "role",
            as: "select",
            children: roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            )),
          },
          {
            label: "Username",
            name: "username",
          },
          {
            label: "Email",
            name: "email",
          },
        ]}
      >
        {error && (
          <Alert
            variant="danger"
            message={getErrorMessage(error)}
            className="w-full"
          />
        )}
        <div className="flex justify-between">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={disableOnClick}
            data-user-id={id}
            disabled={disabled}
          >
            Disable
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default UserCard
