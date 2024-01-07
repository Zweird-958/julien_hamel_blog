import removeNull from "@/utils/removeNull"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"

const PaginationItem = ({ query, pathname, ...otherProps }) => (
  <li>
    <Button
      as={Link}
      href={{
        pathname,
        query,
      }}
      {...otherProps}
    />
  </li>
)
const Pagination = (props) => {
  const { page, pathname, query, numberOfPages } = props

  if (numberOfPages < 2) {
    return null
  }

  const sanitizedQuery = removeNull(query)
  const previousQuery = { page: page - 1, ...sanitizedQuery }
  const nextQuery = { page: page + 1, ...sanitizedQuery }

  return (
    <nav>
      <ul className="flex gap-2">
        {page > 1 && (
          <>
            <PaginationItem pathname={pathname} query={previousQuery}>
              Previous
            </PaginationItem>
            <PaginationItem pathname={pathname} query={previousQuery}>
              {page - 1}
            </PaginationItem>
          </>
        )}
        <PaginationItem
          pathname={pathname}
          query={{ page, ...sanitizedQuery }}
          variant="secondary"
        >
          {page}
        </PaginationItem>
        {page < numberOfPages && (
          <>
            <PaginationItem pathname={pathname} query={nextQuery}>
              {page + 1}
            </PaginationItem>
            <PaginationItem pathname={pathname} query={nextQuery}>
              Next
            </PaginationItem>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
