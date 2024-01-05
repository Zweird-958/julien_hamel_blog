const Input = (props) => {
  const { as: Component = "input", fieldRef, ...otherProps } = props

  return (
    <Component
      className="border-primary border-2 rounded px-2 py-1"
      ref={fieldRef}
      {...otherProps}
    />
  )
}

export default Input
