import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Language } from '@/i18n/messages'
import { useI18n } from '@/i18n/useI18n'

const languages: Array<{ value: Language; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'sq', label: 'SQ' },
]

function LanguageToggle() {
  const { language, messages, setLanguage } = useI18n()

  return (
    <div
      className="inline-flex items-center rounded-full border bg-background p-1"
      aria-label={messages.common.language}
    >
      <Languages className="ml-2 size-3.5 text-muted-foreground" />
      {languages.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={language === option.value ? 'default' : 'ghost'}
          className="h-7 rounded-full px-2.5 text-xs"
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}

export default LanguageToggle
