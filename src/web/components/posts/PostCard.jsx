import EditPostForm from "@/web/components/posts/EditPostForm"
import { useSession } from "@/web/components/SessionContext"
import PostFooterCard from "@/web/components/posts/PostFooterCard"
import Button from "@/web/components/ui/Button"
import Card from "@/web/components/ui/Card"
import clsx from "clsx"
import { useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

const PostCard = (props) => {
  const { post, truncateContent, singlePage, refetchPost } = props
  const { id, title, content, visits, author } = post
  const { session } = useSession()
  const [editPost, setEditPost] = useState(false)
  const toggleEditPost = () => {
    setEditPost(!editPost)
  }
  const onSuccessEditPost = () => {
    setEditPost(false)
    refetchPost()
  }

  return (
    <Card key={id}>
      {session.user.id === author.id && singlePage && (
        <Button onClick={toggleEditPost} className="self-start" color="warning">
          <PencilSquareIcon className="w-5 h-5" />
        </Button>
      )}
      {editPost ? (
        <EditPostForm post={post} onSuccess={onSuccessEditPost} />
      ) : (
        <>
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
          {!singlePage && <PostFooterCard id={id} author={author} />}
        </>
      )}
    </Card>
  )
}

export default PostCard
