interface ErrorStateProps {
  title?: string
  description: string
}

export function ErrorState({ title = 'Something went wrong', description }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
      <h3 className="font-medium text-rose-700">{title}</h3>
      <p className="mt-1 text-sm text-rose-600">{description}</p>
    </div>
  )
}