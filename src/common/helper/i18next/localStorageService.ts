import Config from 'config/index'

export function setI18nextLanguage(language: string) {
  localStorage.setItem(
    Config.i18nextLanguageDetectorOptions.lookupLocalStorage ?? 'i18nextLng',
    language
  )
}
