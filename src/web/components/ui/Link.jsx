import clsx from "clsx"
import NextLink from "next/link"

const Link = (props) => {
  const { className, ...otherProps } = props

  return <NextLink className={clsx("font-medium", className)} {...otherProps} />
}

export default Link
