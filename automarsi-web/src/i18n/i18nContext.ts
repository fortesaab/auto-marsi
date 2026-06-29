import { createContext } from 'react'
import type { Language, Messages } from './messages'

export type I18nContextValue = {
  language: Language
  messages: Messages
  setLanguage: (language: Language) => void
}

export const I18nContext = createContext<I18nContextValue | null>(null)
