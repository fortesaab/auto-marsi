type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="grid gap-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase text-red-600">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeader
