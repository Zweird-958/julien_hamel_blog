import Input from "@/web/components/ui/Input"
import { useController } from "react-hook-form"

const FormField = (props) => {
  const { as: Component = Input, label, control, name, ...otherProps } = props
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <label className="flex flex-col w-full">
      {label && <span>{label}</span>}
      <Component {...field} {...otherProps} />
      {error && <span className="text-red-500">{error.message}</span>}
    </label>
  )
}

export default FormField
