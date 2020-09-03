import React, { useMemo } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import router, { MenuConfig, defaultPageConfig } from '../../router'
import NavigationBar from 'components/NavigationBar'
import styles from './style.module.scss'

export interface BasicLayoutProps extends RouteComponentProps {
  menus: MenuConfig[]
  className?: string
}

// https://github.com/ReactTraining/react-router/issues/3928
// https://reacttraining.com/react-router/web/example/sidebar
// https://zhuanlan.zhihu.com/p/81752821
const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  menus,
  className,
  location,
}) => {
  const pageConfig =
    router.findPageByPathname(location.pathname) || defaultPageConfig

  const shrinkContent = pageConfig.showMenu && !pageConfig.overlayContent
  const showNav = pageConfig.showNav

  return useMemo(
    () => (
      <div className={className}>
        <div
          className={`${styles.content} ${
            shrinkContent ? styles.contentShrink : ''
          }`}
        >
          {showNav && <NavigationBar />}
          {children}
        </div>
      </div>
    ),
    [children, className, showNav, shrinkContent]
  )
}
BasicLayout.defaultProps = { className: '' }

// https://reacttraining.com/react-router/web/api/withRouter
// https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(BasicLayout)
