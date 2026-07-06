import { cn } from '@/lib/utils'

type AdminAvatarProps = {
  name: string
  className?: string
}

const avatarTones = [
  'bg-amber-100 text-amber-700',
  'bg-yellow-100 text-yellow-800',
  'bg-emerald-100 text-emerald-700',
  'bg-orange-100 text-orange-700',
  'bg-rose-100 text-rose-700',
]

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return initials || 'AM'
}

function AdminAvatar({ name, className }: AdminAvatarProps) {
  const tone = avatarTones[name.length % avatarTones.length]

  return (
    <span
      className={cn(
        'grid size-9 shrink-0 place-items-center rounded-xl text-xs font-bold',
        tone,
        className
      )}
    >
      {getInitials(name)}
    </span>
  )
}

export default AdminAvatar
