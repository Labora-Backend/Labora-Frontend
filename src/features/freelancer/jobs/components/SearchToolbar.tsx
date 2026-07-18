import { Search } from 'lucide-react'
import type { JobCategory } from '@/features/freelancer/jobs/types/jobs'
import { categories, sortOptions, type SortOption } from '@/features/freelancer/jobs/utils/jobFilters'

interface SearchToolbarProps {
  search: string
  category: 'All Categories' | JobCategory
  sort: SortOption
  onSearchChange: (value: string) => void
  onCategoryChange: (value: 'All Categories' | JobCategory) => void
  onSortChange: (value: SortOption) => void
}

export function SearchToolbar({ search, category, sort, onSearchChange, onCategoryChange, onSortChange }: SearchToolbarProps) {
  return (
    <section className="flex min-h-[76px] items-center gap-4 border-y border-[#E5E7EB] bg-[#F8FAFC] px-6 py-5">
      <label className="relative min-w-[320px] flex-1" aria-label="Search jobs">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search jobs by title, skills or keywords..."
          className="h-[52px] w-full rounded-[12px] border border-[#E5E7EB] bg-white pl-12 pr-4 text-[14px] font-medium text-[#111827] shadow-lg shadow-purple-100/20 outline-none transition placeholder:text-[#94A3B8] focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15"
        />
      </label>
      <select value={category} onChange={(event) => onCategoryChange(event.target.value as 'All Categories' | JobCategory)} className="h-[52px] w-[210px] rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[14px] font-bold text-[#111827] shadow-lg shadow-purple-100/20 outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15" aria-label="Category">
        <option>All Categories</option>
        {categories.map((item) => <option key={item}>{item}</option>)}
      </select>
      <select value={sort} onChange={(event) => onSortChange(event.target.value as SortOption)} className="h-[52px] w-[210px] rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[14px] font-bold text-[#111827] shadow-lg shadow-purple-100/20 outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15" aria-label="Sort jobs">
        {sortOptions.map((item) => <option key={item}>{item}</option>)}
      </select>
      <button type="button" className="inline-flex h-[52px] w-[170px] items-center justify-center gap-2 rounded-[10px] bg-[#6D28D9] text-[14px] font-bold text-white shadow-lg shadow-purple-100/20 transition hover:bg-[#7C3AED] active:scale-[0.98]">
        <Search className="h-4 w-4" /> Search
      </button>
    </section>
  )
}
