import clsx from "clsx"
const variants = (color) => ({
  fill: `bg-${color} text-white border-${color}`,
  bordered: `border-${color} text-${color}`,
  empty: `text-${color}`,
})
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
        variants(color)[variant],
        className,
      )}
      {...otherProps}
    />
  )
}

export default Button
