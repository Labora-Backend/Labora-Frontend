import { ArrowLeft, ArrowRight } from 'lucide-react'

interface JobPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function JobPagination({ currentPage, totalPages, onPageChange }: JobPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const visiblePages = pages.length > 5 ? [1, 2, 3, -1, totalPages] : pages

  return (
    <nav className="flex justify-center pt-2" aria-label="Job pagination">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onPageChange(Math.max(1, currentPage - 1))} className="grid h-11 w-11 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#64748B] shadow-lg shadow-purple-100/20 transition hover:bg-[#F8FAFC] disabled:opacity-40" disabled={currentPage === 1} aria-label="Previous page">
          <ArrowLeft className="h-4 w-4" />
        </button>
        {visiblePages.map((page, index) => page === -1 ? (
          <span key={`ellipsis-${index}`} className="px-2 text-[14px] font-bold text-[#64748B]">...</span>
        ) : (
          <button key={page} type="button" onClick={() => onPageChange(page)} className={`grid h-11 w-11 place-items-center rounded-[10px] border text-[14px] font-bold shadow-lg shadow-purple-100/20 transition ${page === currentPage ? 'border-[#6D28D9] bg-[#6D28D9] text-white' : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F8FAFC]'}`} aria-label={`Page ${page}`} aria-current={page === currentPage ? 'page' : undefined}>
            {page}
          </button>
        ))}
        <button type="button" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className="grid h-11 w-11 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#64748B] shadow-lg shadow-purple-100/20 transition hover:bg-[#F8FAFC] disabled:opacity-40" disabled={currentPage === totalPages} aria-label="Next page">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  )
}
