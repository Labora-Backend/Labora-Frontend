import { Bookmark } from 'lucide-react'

interface SavedButtonProps {
  saved: boolean
  onToggle: () => void
  label: string
}

export function SavedButton({ saved, onToggle, label }: SavedButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`grid h-[42px] w-[50px] place-items-center rounded-[10px] border border-[#E5E7EB] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-100/20 ${saved ? 'bg-[#F3E8FF] text-[#6D28D9]' : 'bg-white text-[#111827]'}`}
      aria-label={`${saved ? 'Remove saved job' : 'Save job'} ${label}`}
    >
      <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
    </button>
  )
}
