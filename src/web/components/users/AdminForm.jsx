import { userSchema } from "@/utils/schemas"
import Alert from "@/web/components/ui/Alert"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import getErrorMessage from "@/web/utils/getErrorMessage"

const fields = [
  {
    label: "Role",
    name: "role",
    as: "select",
  },
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Email",
    name: "email",
  },
]
const AdminForm = (props) => {
  const { user, roles, onSubmit, error, disableOnClick } = props
  const {
    id,
    email,
    username,
    role: { id: roleId },
    disabled,
  } = user

  return (
    <Form
      schema={userSchema}
      defaultValues={{ role: roleId.toString(), id, username, email }}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      fields={fields.map((field) =>
        field.name === "role"
          ? {
              ...field,
              children: roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              )),
            }
          : field,
      )}
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
  )
}

export default AdminForm
