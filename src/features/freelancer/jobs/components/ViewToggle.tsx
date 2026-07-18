import { Grid3X3, List } from 'lucide-react'
import type { ViewMode } from '@/features/freelancer/jobs/utils/jobFilters'

interface ViewToggleProps {
  value: ViewMode
  onChange: (value: ViewMode) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[14px] font-medium text-[#374151]">View as:</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange('grid')}
          className={`grid h-11 w-11 place-items-center rounded-[12px] transition ${value === 'grid' ? 'bg-[#F3E8FF] text-[#6D28D9]' : 'bg-white text-[#6B7280] hover:bg-[#F8FAFC]'}`}
          aria-label="Grid view"
        >
          <Grid3X3 className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => onChange('list')}
          className={`grid h-11 w-11 place-items-center rounded-[12px] transition ${value === 'list' ? 'bg-[#F3E8FF] text-[#6D28D9]' : 'bg-white text-[#6B7280] hover:bg-[#F8FAFC]'}`}
          aria-label="List view"
        >
          <List className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
