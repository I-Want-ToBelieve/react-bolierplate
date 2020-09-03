/* eslint-disable no-useless-escape */
import { converter } from '../'

test('showdown decorator should be converted', () => {
  const html = converter.makeHtml(
    '@analogy some of the parameters\nSome long long long long long long long long long long long text.\nAnother long long long long long long long long piece of text.\n\n'
  )

  expect(html)
    .toBe(`<div class=\"analogy\" data-info=\"some of the parameters\"><p>Some long long long long long long long long long long long text.
Another long long long long long long long long piece of text.</p></div>`)
})

test('showdown decorator capital letters should be recognized equally', () => {
  const html = converter.makeHtml(
    '@A some of the parameters\nSome long long long long long long long long long long long text.\nAnother long long long long long long long long piece of text.\n\n'
  )

  expect(html)
    .toBe(`<div class=\"analogy\" data-info=\"some of the parameters\"><p>Some long long long long long long long long long long long text.
Another long long long long long long long long piece of text.</p></div>`)
})
