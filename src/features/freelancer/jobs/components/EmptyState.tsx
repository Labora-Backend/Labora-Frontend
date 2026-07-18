import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  onClear: () => void
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="grid min-h-[440px] place-items-center rounded-[24px] border border-[#E5E7EB] bg-white p-10 text-center shadow-lg shadow-purple-100/20">
      <div>
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-[28px] bg-[#F3E8FF] text-[#6D28D9]">
          <SearchX className="h-11 w-11" />
        </div>
        <h2 className="mt-6 text-[24px] font-extrabold text-[#111827]">No jobs found</h2>
        <p className="mx-auto mt-2 max-w-md text-[14px] font-medium text-[#6B7280]">Try changing filters or search keywords.</p>
        <button type="button" onClick={onClear} className="mt-6 h-[44px] rounded-[10px] bg-[#6D28D9] px-6 text-[14px] font-bold text-white shadow-lg shadow-purple-100/20 transition hover:bg-[#7C3AED]">Clear Filters</button>
      </div>
    </div>
  )
}
