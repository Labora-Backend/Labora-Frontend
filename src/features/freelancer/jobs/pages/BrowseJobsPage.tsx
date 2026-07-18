import { useEffect, useMemo, useState } from 'react'
import { Bookmark, Bell, Menu, MessageSquare, Search } from 'lucide-react'
import { Sidebar } from '@/features/freelancer/components/dashboard/Sidebar'
import { UserDropdown } from '@/features/freelancer/components/dashboard/UserDropdown'
import { mockJobs } from '@/features/freelancer/jobs/data/mockJobs'
import { EmptyState } from '@/features/freelancer/jobs/components/EmptyState'
import { JobFilters } from '@/features/freelancer/jobs/components/JobFilters'
import { JobList } from '@/features/freelancer/jobs/components/JobList'
import { JobPagination } from '@/features/freelancer/jobs/components/JobPagination'
import { SearchToolbar } from '@/features/freelancer/jobs/components/SearchToolbar'
import { ViewToggle } from '@/features/freelancer/jobs/components/ViewToggle'
import {
  defaultFilters,
  filterJobs,
  readJsonStorage,
  sortJobs,
  type JobFiltersState,
  type ViewMode,
} from '@/features/freelancer/jobs/utils/jobFilters'

const JOBS_PER_PAGE = 5
const SAVED_STORAGE_KEY = 'labora_saved_jobs'
const VIEW_STORAGE_KEY = 'labora_jobs_view'

export function BrowseJobsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<JobFiltersState>(defaultFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => readJsonStorage<string[]>(SAVED_STORAGE_KEY, []))
  const [view, setView] = useState<ViewMode>(() => readJsonStorage<ViewMode>(VIEW_STORAGE_KEY, 'list'))

  const filteredJobs = useMemo(() => sortJobs(filterJobs(mockJobs, filters), filters.sort), [filters])
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE))
  const visibleJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE
    return filteredJobs.slice(start, start + JOBS_PER_PAGE)
  }, [currentPage, filteredJobs])

  useEffect(() => {
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedJobIds))
  }, [savedJobIds])

  useEffect(() => {
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(view))
  }, [view])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters, view])

  const clearFilters = () => setFilters(defaultFilters)
  const toggleSaved = (id: string) => {
    setSavedJobIds((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F8FAFC] font-sans text-[#111827]">
      <div className="flex min-h-screen">
        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onToggle={() => setSidebarCollapsed((value) => !value)}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-xl">
            <div className="flex h-[72px] items-center justify-between gap-6 px-6">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <button type="button" onClick={() => setMobileSidebarOpen(true)} className="rounded-[12px] border border-[#E5E7EB] bg-white p-2 text-[#111827] shadow-lg shadow-purple-100/20 lg:hidden" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </button>
                <label className="relative hidden w-full max-w-[500px] md:block" aria-label="Global search">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#374151]" />
                  <input className="h-[44px] w-full rounded-[14px] border border-[#E5E7EB] bg-white pl-12 pr-14 text-[14px] font-medium text-[#111827] shadow-lg shadow-purple-100/20 outline-none placeholder:text-[#94A3B8]" placeholder="Search for jobs, clients or projects..." />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-[#F8FAFC] px-2 py-1 text-[11px] font-bold text-[#94A3B8]">⌘K</span>
                </label>
              </div>
              <div className="flex items-center gap-5">
                <button className="relative text-[#111827]" aria-label="Messages"><MessageSquare className="h-5 w-5" /><span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#6D28D9] px-1 text-[10px] font-bold text-white">5</span></button>
                <button className="relative text-[#111827]" aria-label="Notifications"><Bell className="h-5 w-5" /><span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#6D28D9] px-1 text-[10px] font-bold text-white">12</span></button>
                <UserDropdown />
              </div>
            </div>
          </header>

          <section className="flex min-h-[104px] items-center justify-between gap-4 px-6 py-6">
            <div>
              <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.01em] text-[#111827]">Browse Jobs</h1>
              <p className="mt-2 text-[15px] font-medium text-[#334155]">Find exciting freelance projects that match your skills and interests.</p>
            </div>
            <button className="inline-flex h-[44px] items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-5 text-[14px] font-bold text-[#6D28D9] shadow-lg shadow-purple-100/20 transition hover:bg-[#F8FAFC]" type="button">
              <Bookmark className="h-4 w-4" /> Saved Jobs
            </button>
          </section>

          <SearchToolbar
            search={filters.search}
            category={filters.category}
            sort={filters.sort}
            onSearchChange={(search) => setFilters({ ...filters, search })}
            onCategoryChange={(category) => setFilters({ ...filters, category })}
            onSortChange={(sort) => setFilters({ ...filters, sort })}
          />

          <main className="grid gap-6 px-6 py-5 lg:grid-cols-[276px_minmax(0,1fr)]">
            <div className="lg:hidden">
              <button type="button" onClick={() => setMobileFiltersOpen(true)} className="h-[44px] w-full rounded-[10px] bg-[#6D28D9] text-[14px] font-bold text-white shadow-lg shadow-purple-100/20">Open Filters</button>
            </div>
            <JobFilters filters={filters} onChange={setFilters} onClear={clearFilters} mobileOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} />

            <section className="min-w-0 space-y-5">
              <div className="flex h-[44px] items-center justify-between">
                <p className="text-[14px] font-medium text-[#374151]">{filteredJobs.length.toLocaleString('en-IN')} jobs found</p>
                <ViewToggle value={view} onChange={setView} />
              </div>

              {visibleJobs.length > 0 ? (
                <>
                  <JobList jobs={visibleJobs} savedJobIds={savedJobIds} view={view} onToggleSaved={toggleSaved} />
                  <JobPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
              ) : (
                <EmptyState onClear={clearFilters} />
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default BrowseJobsPage

