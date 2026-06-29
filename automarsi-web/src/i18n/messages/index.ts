import { en } from './en'
import { sq } from './sq'

export const messages = {
  en,
  sq,
} as const

export type Language = keyof typeof messages
export type Messages = typeof en

export const defaultLanguage: Language = 'en'

export function isLanguage(value: string): value is Language {
  return value in messages
}
