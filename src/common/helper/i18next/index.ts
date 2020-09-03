// https://www.i18next.com/
// https://react.i18next.com/
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-chained-backend'
import LocalStorageBackend from 'i18next-localstorage-backend' // primary use cache
import HttpApi from 'i18next-http-backend' // fallback http load
// import resources from './resources'
import Config from 'config/index'

const isPro = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'
// https://github.com/i18next/i18next-browser-languageDetector
const languageDetector = new LanguageDetector(
  null,
  Config.i18nextLanguageDetectorOptions
)

// https://react.i18next.com/getting-started#basic-sample
i18n
  .use(Backend) // https://github.com/i18next/i18next-chained-backend
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: isPro ? false : true,
    backend: {
      backends: [
        LocalStorageBackend, // primary
        HttpApi, // fallback
      ],
      backendOptions: [
        {
          /* below options */
          // https://github.com/i18next/i18next-localstorage-backend#cache-backend-options
          ...Config.i18nextLocalstorageBackendOptions,
        },
        {
          // https://github.com/i18next/i18next-http-backend
          ...Config.i18nextHttpBackendOptions,
        },
      ],
    },
    resources: {},
    partialBundledLanguages: true,
    // https://developer.mozilla.org/zh-CN/docs/Web/API/NavigatorLanguage/language
    // https://www.i18next.com/how-to/faq#process
    lng: isTest ? 'cimode' : navigator.language,
    appendNamespaceToCIMode: isTest,
    fallbackLng: navigator.languages as string[],
    // load: 'currentOnly',
    ns: ['website'],
    defaultNS: 'website',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
