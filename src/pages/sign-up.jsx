import { signUpSchema } from "@/utils/schemas"
import Alert from "@/web/components/ui/Alert"
import Card from "@/web/components/ui/Card"
import CenterDiv from "@/web/components/ui/CenterDiv"
import Form from "@/web/components/ui/Form"
import useMutation from "@/web/hooks/useMutation"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { useRouter } from "next/router"

const SignUp = () => {
  const router = useRouter()
  const { mutate, error, isPending } = useMutation({
    endpoint: "users",
  })
  const onSubmit = (crendentials) => {
    mutate(crendentials, {
      onSuccess: () => {
        router.push("/sign-in")
      },
    })
  }

  return (
    <CenterDiv>
      <Card className="max-w-lg">
        <Form
          schema={signUpSchema}
          defaultValues={{ username: "", email: "", password: "" }}
          onSubmit={onSubmit}
          isLoading={isPending}
          title="Sign Up"
          fields={[
            { label: "Username", name: "username" },
            { label: "Email", name: "email" },
            { label: "Password", name: "password", type: "password" },
          ]}
        >
          {error && (
            <Alert
              variant="danger"
              message={getErrorMessage(error)}
              className="w-full"
            />
          )}
        </Form>
      </Card>
    </CenterDiv>
  )
}

export default SignUp
