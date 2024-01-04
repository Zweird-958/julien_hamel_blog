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
  disabled: {
    fill: "bg-disabled text-white border-disabled",
    bordered: "border-disabled text-disabled",
    empty: "text-disabled",
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
    disabled,
    ...otherProps
  } = props

  return (
    <Component
      className={clsx(
        "px-4 py-2 rounded-lg border-2 flex gap-2 text-center items-center",
        disabled ? variants.disabled[variant] : variants[color][variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...otherProps}
    >
      {isLoading && <ArrowPathIcon className="w-6 animate-spin" />}
      {children}
    </Component>
  )
}

export default Button
