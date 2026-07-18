import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import type { ExperienceLevel, JobCategory, JobType } from '@/features/freelancer/jobs/types/jobs'
import { categories, experiences, formatBudget, jobTypes, type JobFiltersState } from '@/features/freelancer/jobs/utils/jobFilters'

interface JobFiltersProps {
  filters: JobFiltersState
  onChange: (filters: JobFiltersState) => void
  onClear: () => void
  mobileOpen?: boolean
  onClose?: () => void
}

function toggleValue<T>(values: T[], value: T) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

interface CheckboxItemProps {
  label: string
  checked: boolean
  onChange: () => void
}

function CheckboxItem({ label, checked, onChange }: CheckboxItemProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px] font-medium text-[#4B5563]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-[14px] w-[14px] rounded-[3px] border-[#CBD5E1] text-[#6D28D9] focus:ring-[#6D28D9]/20"
      />
      <span>{label}</span>
    </label>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[15px] font-extrabold text-[#111827]">{title}</h3>
      <ChevronDown className="h-4 w-4 text-[#111827]" />
    </div>
  )
}

export function JobFilters({ filters, onChange, onClear, mobileOpen = true, onClose }: JobFiltersProps) {
  return (
    <>
      {mobileOpen && onClose && <button type="button" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={onClose} aria-label="Close filters" />}
      <aside className={`${onClose ? `fixed inset-y-0 left-0 z-40 w-[296px] overflow-y-auto bg-white p-4 transition-transform lg:static lg:z-auto lg:w-auto lg:translate-x-0 lg:overflow-visible lg:bg-transparent lg:p-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}` : ''}`}>
        <div className="sticky top-[96px] rounded-[24px] border border-[#E5E7EB] bg-white shadow-lg shadow-purple-100/20">
          <div className="flex h-[56px] items-center justify-between border-b border-[#E5E7EB] px-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#6D28D9]" />
              <h2 className="text-[20px] font-extrabold text-[#111827]">Filters</h2>
            </div>
            <button type="button" onClick={onClear} className="text-[13px] font-bold text-[#6D28D9] hover:text-[#7C3AED]">Clear All</button>
          </div>

          <div className="divide-y divide-[#E5E7EB] px-5">
            <section className="py-5">
              <SectionHeader title="Categories" />
              <div className="space-y-3">
                {categories.slice(0, 8).map((category) => (
                  <CheckboxItem key={category} label={category} checked={filters.categories.includes(category)} onChange={() => onChange({ ...filters, categories: toggleValue<JobCategory>(filters.categories, category) })} />
                ))}
                <button type="button" className="flex items-center gap-2 text-[14px] font-medium text-[#4B5563]">Show more <ChevronDown className="h-4 w-4" /></button>
              </div>
            </section>

            <section className="py-5">
              <SectionHeader title="Experience Level" />
              <div className="space-y-3">
                {experiences.map((experience) => (
                  <CheckboxItem key={experience} label={experience} checked={filters.experience.includes(experience)} onChange={() => onChange({ ...filters, experience: toggleValue<ExperienceLevel>(filters.experience, experience) })} />
                ))}
              </div>
            </section>

            <section className="py-5">
              <h3 className="mb-5 text-[15px] font-extrabold text-[#111827]">Budget Range (₹)</h3>
              <input
                type="range"
                min={0}
                max={100000}
                step={5000}
                value={filters.maxBudget}
                onChange={(event) => onChange({ ...filters, maxBudget: Number(event.target.value) })}
                className="h-2 w-full accent-[#6D28D9]"
                aria-label="Maximum budget"
              />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-[8px] border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] font-bold text-[#111827]">₹ 0</div>
                <div className="rounded-[8px] border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] font-bold text-[#111827]">{filters.maxBudget >= 100000 ? '₹ 100,000+' : formatBudget(filters.maxBudget)}</div>
              </div>
            </section>

            <section className="py-5">
              <SectionHeader title="Job Type" />
              <div className="space-y-3">
                {jobTypes.map((jobType) => (
                  <CheckboxItem key={jobType} label={jobType} checked={filters.jobTypes.includes(jobType)} onChange={() => onChange({ ...filters, jobTypes: toggleValue<JobType>(filters.jobTypes, jobType) })} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  )
}
