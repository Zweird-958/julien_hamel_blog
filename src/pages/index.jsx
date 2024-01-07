import countPages from "@/utils/countPages"
import { pageValidator } from "@/utils/validators"
import PostCard from "@/web/components/PostCard"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"
import Pagination from "@/web/components/ui/Pagination"
import useQuery from "@/web/hooks/useQuery"

export const getServerSideProps = ({ query: { page, authorId } }) => ({
  props: {
    page: pageValidator.parse(page),
    authorId: authorId ?? null,
  },
})
const Home = (props) => {
  const { page, authorId } = props
  const {
    data: {
      result: posts,
      meta: { count },
    },
  } = useQuery({
    endpoint: "posts",
    params: {
      page,
      authorId,
    },
  })
  const numberOfPages = countPages(count)

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-md flex flex-col items-center gap-2 w-full">
        {authorId && (
          <Button className="self-start" as={Link} href="/" color="danger">
            Clear filters
          </Button>
        )}
        <div className="flex flex-col gap-4 w-full">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} truncateContent />
          ))}
        </div>
        <Pagination
          page={page}
          numberOfPages={numberOfPages}
          query={{ authorId }}
        />
      </div>
    </div>
  )
}

export default Home
