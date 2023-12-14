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
    ...otherProps
  } = props

  return (
    <Component
      className={clsx(
        "px-4 py-2 rounded-lg border-2",
        variants[color][variant],
        className,
      )}
      {...otherProps}
    />
  )
}

export default Button
