import React, { Suspense, useMemo } from 'react'
// https://reacttraining.com/react-router/web/guides/primary-components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import router from '../../router'
import Loading from 'components/Loading'
import NotFound from 'components/NotFound'
import BasicLayout from './BasicLayout'
import { StoreProvider } from 'easy-peasy'
import { store } from 'common/helper'
import styles from './style.module.scss'
import { QueryParamProvider } from 'use-query-params'

// https://zh-hans.reactjs.org/docs/hooks-intro.html
// https://create-react-app.dev/docs/adding-a-router/
// https://reacttraining.com/react-router/web/example/basic
// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting

export const App: React.FC = () => {
  // 路由
  const routes = useMemo(
    () =>
      router.pages.map((it) => (
        <Route
          key={it.key}
          exact
          path={it.path}
          component={React.lazy(it.page)}
        />
      )),
    []
  )

  // https://reacttraining.com/react-router/web/example/no-match
  // 包装 Suspense
  const routesWrapper = useMemo(
    () => (
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes}
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
    ),
    [routes]
  )

  return useMemo(
    () => (
      <BasicLayout className={styles.container} menus={router.menus}>
        {routesWrapper}
      </BasicLayout>
    ),
    [routesWrapper]
  )
}

export default () => (
  <StoreProvider store={store}>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </StoreProvider>
)
