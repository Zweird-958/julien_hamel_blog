import Card from "@/web/components/ui/Card"
import Link from "@/web/components/ui/Link"
const PostCard = (props) => {
  const { post } = props
  const {
    id,
    title,
    content,
    author: { username },
  } = post

  return (
    <Card key={id}>
      <h2 className="text-xl border-b-2">{title}</h2>
      <p>{content}</p>
      <div className="flex justify-between">
        <Link href={`/posts/${id}`}>See more</Link>
        <p>{username}</p>
      </div>
    </Card>
  )
}

export default PostCard
