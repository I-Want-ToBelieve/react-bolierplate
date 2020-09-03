// http://www.lingoes.cn/zh/translator/langcode.htm
// https://en.wikipedia.org/wiki/IETF_language_tag
import type { Resource } from 'i18next'
import en_US from './locales/en-US'
import zh_CN from './locales/zh-CN'

export const resources: Resource = {
  ...en_US,
  ...zh_CN,
}

export default resources
