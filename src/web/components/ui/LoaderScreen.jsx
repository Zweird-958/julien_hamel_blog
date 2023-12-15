import CenterDiv from "@/web/components/ui/CenterDiv"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

const LoaderScreen = () => (
  <CenterDiv>
    <ArrowPathIcon className="animate-spin h-12 w-12 text-primary" />
  </CenterDiv>
)

export default LoaderScreen
