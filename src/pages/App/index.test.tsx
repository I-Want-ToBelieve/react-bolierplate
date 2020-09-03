import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, fireEvent, waitFor } from '@testing-library/react'
import { App } from './'
import { StoreProvider, createStore, Store } from 'easy-peasy'
import { storeModel, StoreModel } from 'common/helper'
import 'index.scss'
import 'components/index.scss'
import 'common/helper/i18next'

// https://testing-library.com/docs/react-testing-library/intro
// https://testing-library.com/docs/example-react-router
function renderWithRouter(
  ui: React.ReactElement,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    store = createStore(storeModel),
  }: { route?: string; history?: MemoryHistory; store?: Store<StoreModel> } = {}
) {
  const Wrapper: React.FC = ({ children }) => (
    // https://easy-peasy.now.sh/docs/testing/testing-components.html
    <StoreProvider store={store}>
      <Router history={history}>{children}</Router>
    </StoreProvider>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

// https://testing-library.com/docs/dom-testing-library/api-async
// https://jestjs.io/docs/en/asynchronous#asyncawait
test('full app rendering/navigating', async () => {
  const { container, getByText } = renderWithRouter(<App />)
  // Home Page
  await waitFor(() => expect(container.innerHTML).toMatch('学习观'))

  //  Idea Page
  fireEvent.click(getByText(/关于我们/))
  await waitFor(() => expect(container.innerHTML).toMatch('理念'))

  //  Board Page
  fireEvent.click(getByText(/告示/))
  await waitFor(() => expect(container.innerHTML).toMatch(''))

  //  Join Page
  fireEvent.click(getByText(/加入我们/))
  await waitFor(() => expect(container.innerHTML).toMatch('视频原画'))
}, 10000)

test('landing on a bad page', () => {
  const { container } = renderWithRouter(<App />, {
    route: '/something-that-does-not-match',
  })
  expect(container.innerHTML).toMatch('404')
})
