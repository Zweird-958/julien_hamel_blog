const Input = (props) => {
  const { as: Component = "input", ...otherProps } = props

  return (
    <Component
      className="border-primary border-2 rounded px-2 py-1"
      {...otherProps}
    />
  )
}

export default Input
