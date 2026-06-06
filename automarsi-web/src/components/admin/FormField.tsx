import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  children: ReactNode
  error?: string
}

function FormField({ label, children, error }: FormFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      {children}
      {error ? (
        <small className="text-sm font-normal text-destructive">{error}</small>
      ) : null}
    </label>
  )
}

export default FormField
