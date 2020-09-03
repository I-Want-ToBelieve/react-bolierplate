// https://sourcegraph.com/github.com/jaywcjlove/mocker-api/-/blob/example/webpack/webpack.config.js#L21
const delay = require('mocker-api/lib/delay')

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true'

const proxy = {
  // Priority processing.
  // _proxy: {
  //   proxy: {
  //     '/repos/(.*)': 'https://api.github.com/',
  //   },
  //   changeHost: true,
  // },
  'GET /api/sayhello': function (req, res) {
    return res.json({ msg: 'Hello World!', stateCode: 200 })
  },
}

module.exports = noProxy ? {} : delay(proxy, 1000)
