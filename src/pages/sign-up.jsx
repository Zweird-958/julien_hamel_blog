import { signUpSchema } from "@/utils/schemas"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import Form from "@/web/components/ui/Form"
import { createResource } from "@/web/services/apiClient"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"

const SignUp = () => {
  const router = useRouter()
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data) => createResource("users", data),
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
            variant="error"
            message={getErrorMessage(error)}
            className="w-full"
          />
        )}
      </Form>
    </CenterDiv>
  )
}

export default SignUp
