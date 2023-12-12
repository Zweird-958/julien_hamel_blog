const CenterDiv = (props) => {
  const { children } = props

  return (
    <div className="w-screen flex flex-col items-center h-screen justify-center fixed top-0">
      {children}
    </div>
  )
}

export default CenterDiv
