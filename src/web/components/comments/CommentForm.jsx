import { commentSchema } from "@/utils/schemas"
import { useSession } from "@/web/components/SessionContext"
import Alert from "@/web/components/ui/Alert"
import Button from "@/web/components/ui/Button"
import Card from "@/web/components/ui/Card"
import Form from "@/web/components/ui/Form"
import useMutation from "@/web/hooks/useMutation"
const CommentForm = (props) => {
  const { postId, onSuccess } = props
  const { session, clearSession } = useSession()
  const { mutate, isPending, isSuccess } = useMutation({
    endpoint: "comments",
    params: {
      postId,
    },
    onError: ({ response: { status } }) => {
      if (status === 403) {
        clearSession()
      }
    },
    onSuccess,
  })

  if (!session) {
    return null
  }

  return (
    <Card>
      <Form
        className="flex flex-col gap-2"
        schema={commentSchema}
        defaultValues={{ comment: "" }}
        onSubmit={mutate}
        fields={[{ label: "Content", name: "comment", as: "textarea" }]}
      >
        {isSuccess && <Alert message="Comment added" className="w-full" />}
        <Button type="submit" className="self-end" isLoading={isPending}>
          Add comment
        </Button>
      </Form>
    </Card>
  )
}

export default CommentForm
