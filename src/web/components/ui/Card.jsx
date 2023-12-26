import clsx from "clsx"

const Card = (props) => {
  const { children, className } = props

  return (
    <div
      className={clsx(
        "flex gap-4 flex-col bg-card rounded px-4 py-2 w-full",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Card
