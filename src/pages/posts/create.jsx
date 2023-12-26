import { createPostSchema } from "@/utils/schemas"
import Alert from "@/web/components/ui/Alert"
import CenterDiv from "@/web/components/ui/CenterDiv"
import Form from "@/web/components/ui/Form"
import useMutation from "@/web/hooks/useMutation"
import getErrorMessage from "@/web/utils/getErrorMessage"

const CreatePost = () => {
  const { mutate, error, isSuccess, isPending } = useMutation({
    endpoint: "posts",
  })
  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <CenterDiv>
      <Form
        schema={createPostSchema}
        isLoading={isPending}
        defaultValues={{ title: "", content: "" }}
        onSubmit={onSubmit}
        title="Create Post"
        fields={[
          { label: "Title", name: "title" },
          { label: "Content", name: "content" },
        ]}
      >
        {isSuccess && (
          <Alert message="Post created successfully!" className="w-full" />
        )}
        {error && (
          <Alert
            variant="danger"
            message={getErrorMessage(error)}
            className="w-full"
          />
        )}
      </Form>
    </CenterDiv>
  )
}

export default CreatePost
