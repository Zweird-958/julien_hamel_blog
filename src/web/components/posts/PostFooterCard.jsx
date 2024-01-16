const { default: Link } = require("@/web/components/ui/Link")
const PostFooterCard = (props) => {
  const { author, id } = props
  const { id: authorId, username } = author

  return (
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
  )
}

export default PostFooterCard
