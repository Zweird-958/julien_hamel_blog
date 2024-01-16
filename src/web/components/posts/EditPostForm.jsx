import { contentValidator, titleValidator } from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import useMutation from "@/web/hooks/useMutation"
import getErrorMessage from "@/web/utils/getErrorMessage"
import { z } from "zod"

const EditPostForm = (props) => {
  const { post, onSuccess } = props
  const { title, content } = post
  const postSchema = z.object({
    title: titleValidator,
    content: contentValidator,
  })
  const { mutate, isPending, error } = useMutation({
    endpoint: "posts",
    method: "patch",
    onSuccess,
  })
  const onSubmit = (data) => {
    mutate({
      queryId: post.id,
      ...data,
    })
  }

  return (
    <Form
      schema={postSchema}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      defaultValues={{ title, content }}
      fields={[
        {
          label: "Title",
          name: "title",
        },
        {
          label: "Content",
          name: "content",
          as: "textarea",
        },
      ]}
    >
      {error && <Alert variant="danger" message={getErrorMessage(error)} />}
      <Button type="submit" className="self-end" isLoading={isPending}>
        Save
      </Button>
    </Form>
  )
}

export default EditPostForm
