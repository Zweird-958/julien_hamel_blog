import countPages from "@/utils/countPages"
import { pageValidator } from "@/utils/validators"
import PostCard from "@/web/components/PostCard"
import Pagination from "@/web/components/ui/Pagination"
import useQuery from "@/web/hooks/useQuery"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.parse(page),
  },
})
const Home = (props) => {
  const { page } = props
  const {
    data: {
      result: posts,
      meta: { count },
    },
  } = useQuery({
    endpoint: "posts",
    params: {
      page,
    },
  })
  const numberOfPages = countPages(count)

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-4 max-w-md w-full">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} truncateContent />
        ))}
      </div>
      <Pagination page={parseInt(page, 10)} numberOfPages={numberOfPages} />
    </div>
  )
}

export default Home
