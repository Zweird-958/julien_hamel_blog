const removeNull = (obj) =>
  obj &&
  Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value)
      .map(([key, value]) => [key, value]),
  )

export default removeNull
