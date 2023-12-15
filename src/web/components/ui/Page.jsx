import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"

const Page = (props) => {
  const { children } = props
  const { session, signOut } = useSession()

  return (
    <div className="flex flex-col">
      <div className="flex justify-center shadow-sm py-2 z-10 px-4">
        <div className="max-w-2xl w-full flex justify-between items-center">
          <Link className="text-xl" href="/">
            Blog
          </Link>
          {!session ? (
            <div className="flex gap-2">
              <Button as={Link} href="/sign-in">
                Sign In
              </Button>
              <Button
                as={Link}
                variant="bordered"
                color="success"
                href="/sign-up"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              {session.user.role === "admin" && (
                <Button as={Link} href="/admin">
                  Dashboard
                </Button>
              )}
              <Button color="danger" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Page
