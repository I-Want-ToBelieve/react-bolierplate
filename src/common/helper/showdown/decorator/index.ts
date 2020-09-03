import type { Extension } from '../index'

export interface showdownDecoratorOptions {
  name: string
  initials: boolean
}
export type showdownDecorator = (
  options: showdownDecoratorOptions | showdownDecoratorOptions[]
) => Extension[]
export const showdownDecorator: showdownDecorator = (options) => {
  const options_ = Array.isArray(options) ? options : [options]

  return options_.map(({ name, initials }) => [
    name,
    () => [
      {
        type: 'output', //or lang
        filter(text) {
          const reg = RegExp(
            `<p>[ \t]?@(${
              initials ? name.substring(0, 1).toUpperCase() + '|' + name : name
            })[ \t]+(.*)\n([\\s\\S]*?)<\\/p>`,
            'g'
          )

          return text.replace(reg, (match, p1, p2, p3) => {
            return `<div class="${name}" data-info="${p2}"><p>${p3}</p></div>`
          })
        },
      },
    ],
  ])
}

export default showdownDecorator
