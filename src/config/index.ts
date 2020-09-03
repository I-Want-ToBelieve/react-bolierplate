import type { DetectorOptions } from 'i18next-browser-languagedetector'
import type { I18NextLocalStorageBackend } from 'i18next-localstorage-backend'
import type { BackendOptions } from 'i18next-http-backend'

const { REACT_APP_USER_CENTER_URL } = process.env

export class Config {
  // https://github.com/i18next/i18next-browser-languageDetector#detector-options
  static i18nextLanguageDetectorOptions: DetectorOptions = {
    lookupLocalStorage: 'i18nextLanguage',
  }

  // https://github.com/i18next/i18next-localstorage-backend#cache-backend-options
  static i18nextLocalstorageBackendOptions:
    | I18NextLocalStorageBackend.BackendOptions
    | { defaultVersion: string } = {
    // prefix for stored languages
    prefix: 'i18next_res_',
    // expiration
    expirationTime: 7 * 24 * 60 * 60 * 1000,
    // Version applied to all languages, can be overriden using the option `versions`
    defaultVersion: '',
    // language versions eg. versions: { en: 'v1.2', fr: 'v1.1' }
    versions: {},
    // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
    store: window.localStorage,
  }

  // https://github.com/i18next/i18next-http-backend
  static i18nextHttpBackendOptions: BackendOptions = {
    loadPath: 'asset/locales/{{lng}}/{{ns}}.json', // xhr load path for my own fallback
  }

  // Access the url to fetch refreshToken
  static refreshTokenURL: string = `${REACT_APP_USER_CENTER_URL}/auth/refresh`

  static loginRoutePath: string = '/login'
}

export default Config
