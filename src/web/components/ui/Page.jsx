import SideBar from "@/web/components/SideBar"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"
import { Bars3Icon } from "@heroicons/react/24/outline"
import { useState } from "react"

const Page = (props) => {
  const { children } = props
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="flex flex-col">
      <div className="flex justify-center shadow-sm py-2 z-10 px-4">
        <div className="max-w-3xl w-full flex justify-between items-center">
          <Link className="text-xl" href="/">
            Blog
          </Link>
          <Button variant="bordered" onClick={toggleMenu}>
            <Bars3Icon className="w-6 h-6" />
          </Button>
        </div>
      </div>
      {children}

      {isMenuOpen && <SideBar />}
    </div>
  )
}

export default Page
