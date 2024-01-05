import FormField from "@/web/components/ui/FormField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const FormGeneric = (props) => {
  const {
    onSubmit,
    schema,
    defaultValues,
    className,
    fields = [],
    children,
  } = props
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {fields.map((fieldProps) => (
        <FormField key={fieldProps.name} {...fieldProps} control={control} />
      ))}
      {children}
    </form>
  )
}

export default FormGeneric
