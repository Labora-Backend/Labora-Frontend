import Button from '@/components/ui/Button'
import type { ClientProfileSummary } from '@/features/client/types/dashboard'
import { ClientCard, ClientCardBody } from '@/features/client/components/ClientCard'

interface ClientProfileCardProps {
  profile: ClientProfileSummary
}

export default function ClientProfileCard({ profile }: ClientProfileCardProps) {
  return (
    <ClientCard className="h-full">
      <ClientCardBody className="flex flex-col items-center text-center">
        <img
          src={profile.avatar}
          alt={profile.name}
          loading="lazy"
          className="h-16 w-16 rounded-full border-4 border-primary-50 object-cover ring-2 ring-primary/10"
        />
        <h3 className="mt-3 text-base font-bold text-text">{profile.name}</h3>
        <span className="mt-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {profile.role}
        </span>

        <div className="mt-4 w-full">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-text-muted">Profile Completion</span>
            <span className="font-semibold text-primary">{profile.profileCompletion}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-brand transition-all duration-500"
              style={{ width: `${profile.profileCompletion}%` }}
            />
          </div>
        </div>

        <Button href="/client/profile" variant="outline" size="sm" className="mt-4 w-full">
          View Profile
        </Button>
      </ClientCardBody>
    </ClientCard>
  )
}
