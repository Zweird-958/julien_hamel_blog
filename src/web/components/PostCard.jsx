import Card from "@/web/components/ui/Card"
import Link from "@/web/components/ui/Link"
import clsx from "clsx"
const PostCard = (props) => {
  const { post, truncateContent } = props
  const {
    id,
    title,
    content,
    author: { username, id: authorId },
  } = post

  return (
    <Card key={id}>
      <h2 className="text-xl border-b-2 truncate">{title}</h2>
      <p
        className={clsx(
          "text-wrap w-full break-words",
          truncateContent && "line-clamp-2",
        )}
      >
        {content}
      </p>
      <div className="flex justify-between">
        <Link href={`/posts/${id}`}>See more</Link>
        <Link
          href={{
            pathname: "/",
            query: { authorId },
          }}
        >
          {username}
        </Link>
      </div>
    </Card>
  )
}

export default PostCard
