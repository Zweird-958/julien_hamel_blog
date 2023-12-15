import { ArrowPathIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

const variants = {
  primary: {
    fill: "bg-primary text-white border-primary",
    bordered: "border-primary text-primary",
    empty: "text-primary",
  },
  success: {
    fill: "bg-success text-white border-success",
    bordered: "border-success text-success",
    empty: "text-success",
  },
  danger: {
    fill: "bg-danger text-white border-danger",
    bordered: "border-danger text-danger",
    empty: "text-danger",
  },
}
const Button = (props) => {
  const {
    as: Component = "button",
    variant = "fill",
    color = "primary",
    className,
    children,
    isLoading,
    ...otherProps
  } = props

  return (
    <Component
      className={clsx(
        "px-4 py-2 rounded-lg border-2 flex gap-2",
        variants[color][variant],
        className,
      )}
      {...otherProps}
    >
      {isLoading && <ArrowPathIcon className="w-6 animate-spin" />}
      {children}
    </Component>
  )
}

export default Button
