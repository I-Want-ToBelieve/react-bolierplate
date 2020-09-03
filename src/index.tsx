import React from 'react'
import { render } from 'react-dom'

import App from './pages/App'
import * as serviceWorker from './serviceWorker'

import 'react-app-polyfill/stable'
import './index.scss'
import './components/index.scss'
import 'common/helper/i18next'

// https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html#enabling-concurrent-mode
render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
