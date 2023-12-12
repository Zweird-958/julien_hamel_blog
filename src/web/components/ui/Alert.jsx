import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"

const clsx = require("clsx")
const variants = {
  error: "bg-danger text-danger",
  success: "bg-success text-success",
}
const Alert = (props) => {
  const { variant = "success", message, className } = props

  return (
    <div
      className={clsx(
        "h-16 shadow-md py-4 rounded bg-opacity-30 px-2 flex gap-2 items-center",
        variants[variant],
        className,
      )}
    >
      {variant === "error" ? (
        <ExclamationCircleIcon className="w-6 text-danger" />
      ) : (
        <CheckIcon className="w-6 text-success" />
      )}
      <p>{message}</p>
    </div>
  )
}

export default Alert
