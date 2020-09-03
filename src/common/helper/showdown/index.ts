import showdown from 'showdown'

import { showdownDecorator } from './decorator'
import { showdownTimestamp } from './timestamp'

import type { extension } from 'showdown'

export type Extension = Parameters<typeof extension>

// https://github.com/showdownjs/showdown#flavors
showdown.setFlavor('original')

// https://github.com/showdownjs/showdown#options
// https://github.com/showdownjs/showdown#valid-options
export const converter = new showdown.Converter({})

export const decoratorOptions = [
  { name: 'example', initials: true },
  { name: 'knowledge', initials: true },
  { name: 'analogy', initials: true },
  { name: 'notice', initials: true },
]
export const decorators = showdownDecorator(decoratorOptions)
decorators.forEach(([name, ext]) => void showdown.extension(name, ext))
decoratorOptions.forEach(({ name }) => void converter.useExtension(name))

export const [timestampName, timestampExt] = showdownTimestamp()
showdown.extension(timestampName, timestampExt)
converter.useExtension(timestampName)

export default converter
