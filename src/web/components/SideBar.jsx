import isAdmin from "@/utils/isAdmin"
import isAuthor from "@/utils/isAuthor"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"
import { XMarkIcon } from "@heroicons/react/24/outline"

const SideBar = (props) => {
  const { toggleMenu } = props
  const { session, signOut } = useSession()

  return (
    <div className="max-w-sm w-full shadow-md bg-white flex flex-col gap-4 p-4 fixed z-10 right-0 h-screen">
      <Button
        variant="bordered"
        className="w-fit self-end"
        onClick={toggleMenu}
      >
        <XMarkIcon className="w-6 h-6" />
      </Button>
      {!session ? (
        <>
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </>
      ) : (
        <>
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
          {isAdmin(session.user) && <Link href="/admin">Admin Dashboard</Link>}
          <Link href="/dashboard">Dashboard</Link>
          {isAuthor(session.user) && (
            <Link href="/posts/create">Create Post</Link>
          )}
          <Button color="danger" onClick={signOut} className="w-fit">
            Sign Out
          </Button>
        </>
      )}
    </div>
  )
}

export default SideBar
