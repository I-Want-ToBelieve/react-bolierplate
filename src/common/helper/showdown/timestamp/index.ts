import type { Extension } from '../index'

export type showdownTimestamp = () => Extension
export const showdownTimestamp: showdownTimestamp = () => {
  return [
    'timestamp',
    [
      {
        type: 'output', //or lang
        filter(text) {
          const reg = RegExp(
            `(\\d{2}:\\d{2}:\\d{2},\\d{3})[ \t]*--&gt;[ \t]*(\\d{2}:\\d{2}:\\d{2},\\d{3})`,
            'g'
          )

          return text.replace(reg, (match, p1, p2) => {
            return `[${p1} - ${p2}]`
          })
        },
      },
    ],
  ]
}

export default showdownTimestamp
