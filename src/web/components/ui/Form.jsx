import Button from "@/web/components/ui/Button"
import FormField from "@/web/components/ui/FormField"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"

const Form = (props) => {
  const {
    onSubmit,
    schema,
    defaultValues,
    title,
    fields = [],
    children,
    isLoading,
    className,
  } = props
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={className ?? "p-4 flex flex-col items-center gap-3 w-full"}
    >
      {title && <p className="text-xl font-semibold">{title}</p>}
      {fields.map((fieldProps) => (
        <FormField key={fieldProps.name} {...fieldProps} control={control} />
      ))}
      {children}
      {title && (
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full font-semibold justify-center"
        >
          {title}
        </Button>
      )}
    </form>
  )
}

export default Form
