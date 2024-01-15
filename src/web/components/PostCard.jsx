import Card from "@/web/components/ui/Card"
import Link from "@/web/components/ui/Link"
import clsx from "clsx"
const PostCard = (props) => {
  const { post, truncateContent } = props
  const {
    id,
    title,
    content,
    visits,
    author: { username, id: authorId } = {},
  } = post

  return (
    <Card key={id}>
      <div className="flex justify-between border-b-2">
        <h2 className="text-xl truncate">{title}</h2>
        <p>{visits} Visits</p>
      </div>
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
