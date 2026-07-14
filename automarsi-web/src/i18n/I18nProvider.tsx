import { useMemo, useState, type ReactNode } from 'react'
import { I18nContext, type I18nContextValue } from './i18nContext'
import {
  defaultLanguage,
  isLanguage,
  messages,
  type Language,
} from './messages'

const storageKey = 'automarsi.language.v2'

function getInitialLanguage(): Language {
  const storedLanguage = window.localStorage.getItem(storageKey)

  if (storedLanguage && isLanguage(storedLanguage)) {
    return storedLanguage
  }

  return defaultLanguage
}

type I18nProviderProps = {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const value = useMemo<I18nContextValue>(() => {
    function setLanguage(nextLanguage: Language) {
      window.localStorage.setItem(storageKey, nextLanguage)
      setLanguageState(nextLanguage)
    }

    return {
      language,
      messages: messages[language],
      setLanguage,
    }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
