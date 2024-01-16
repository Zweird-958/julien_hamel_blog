import Card from "@/web/components/ui/Card"

const CommentCard = (props) => {
  const { comment } = props
  const {
    content,
    author: { username },
  } = comment

  return (
    <Card>
      <p>{content}</p>
      <p className="self-end">{username}</p>
    </Card>
  )
}

export default CommentCard
