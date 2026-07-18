import Skeleton from '@/components/ui/Skeleton'
import type { ConversationItem } from '@/features/freelancer/types/dashboard'

interface MessagesPanelProps {
  conversations: ConversationItem[]
  loading: boolean
}

export function MessagesPanel({ conversations, loading }: MessagesPanelProps) {
  if (loading) return <Skeleton className="h-[250px] rounded-[20px]" />

  return (
    <section className="rounded-[20px] border border-[#E2E8F0] min-h-[250px] bg-white p-5 shadow-lg shadow-purple-100/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#0F172A]">Messages</h2>
        <a href="/messages" className="text-sm font-semibold text-[#7C3AED] hover:underline">View All</a>
      </div>
      {conversations.length > 0 ? (
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <article key={conversation.id} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#F8FAFC]">
              <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-200 text-sm font-bold text-[#0F172A]">
                {conversation.name.slice(0, 1).toUpperCase()}
                {conversation.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#10B981]" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#0F172A]">{conversation.name}</p>
                <p className="truncate text-sm text-[#64748B]">{conversation.message ?? 'No recent message'}</p>
              </div>
              {Boolean(conversation.unread) && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#7C3AED] px-2 text-xs font-bold text-white">{conversation.unread}</span>}
            </article>
          ))}
        </div>
      ) : (
        <div className="grid h-[170px] place-items-center rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm font-medium text-[#64748B]">No recent conversations.</div>
      )}
    </section>
  )
}


