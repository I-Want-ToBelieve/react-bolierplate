/* eslint-disable no-useless-escape */
import { converter } from '../'

test('showdown timestamp should be converted', () => {
  const html = converter.makeHtml(
    '## 00:00:20,000  -->  00:00:30,500 some title\n00:00:40,000  -->  00:00:50,500some of the parameters\nSome long long long long long long long long long long long text.\n00:00:45,000  -->  00:00:55,500Another long long long long long long long long piece of text.\n\n'
  )

  expect(html).toBe(`<h2>[00:00:20,000 - 00:00:30,500] some title</h2>
<p>[00:00:40,000 - 00:00:50,500]some of the parameters
Some long long long long long long long long long long long text.
[00:00:45,000 - 00:00:55,500]Another long long long long long long long long piece of text.</p>`)
})
