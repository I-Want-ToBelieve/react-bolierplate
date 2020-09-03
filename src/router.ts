import { ComponentType } from 'react'

// https://github.com/Microsoft/tsdoc
/**
 * 页面配置
 *
 * @template T 页面类型
 */
export interface PageConfig<T extends ComponentType<any> = ComponentType<any>> {
  /**
   * 保证页面列表中唯一即可
   */
  key: string

  /**
   * 标题，用于 document.title
   */
  title?: string

  /**
   * 页面路由
   * @see [React Route path](https://reacttraining.com/react-router/web/api/Route/path-string-string)
   */
  path: string

  /**
   * 页面加载函数，用于分包
   */
  page: () => Promise<{ default: T }>

  /**
   * 该页面能否通过菜单进入，主要用于过滤菜单项，默认 false
   */
  inMenu?: boolean

  /**
   * 该页面是否展示菜单，默认 false
   */
  showMenu?: boolean

  /**
   * 是否显示导航栏，默认 false
   */
  showNav?: boolean
  /**
   * 菜单浮动在内容之上，默认 false
   */
  overlayContent?: boolean
}

export const defaultPageConfig = {
  inMenu: false,
  showMenu: false,
  overlayContent: false,
  showNav: false,
}

export interface MenuConfig {
  /**
   * 若 `undefined`，则取 {@link page#key} 值
   */
  key?: string

  /**
   * 菜单标题
   */
  title: string

  /**
   * 菜单对应的页面
   */
  page: PageConfig
}

// https://reacttraining.com/react-router/web/example/route-config
const pages: PageConfig[] = [
  {
    key: 'home',
    title: '首页',
    path: '/',
    page: () => import('./pages/Home'),
    overlayContent: true,
    showMenu: true,
    showNav: true,
  }
].map((it) => ({ ...defaultPageConfig, ...it }))

const menus: MenuConfig[] = pages
  .filter((it) => it.inMenu)
  .map<MenuConfig>((it) => ({
    title: it.title || '',
    page: it,
  }))

// 拆分 pages 的 path：[ [], ['login'], ..., ['article', ':id'] ... ]
const targetFragments = pages.map((it) => it.path.split('/').filter((it) => it))

// path 片段相等的判断： 如果:开头，则是参数，否则必须全等
const fragmentEqual = (src: string, dst: string) =>
  src.startsWith(':') || src === dst

/**
 * 根据 location.pathname 寻找对应的PageConfig对象
 *
 * @param pathname 路由
 *
 * @returns 未找到的话，请使用 defaultPageConfig
 */
function findPageByPathname(pathname: string): PageConfig | undefined {
  const pathFragments = pathname.split('/').filter((it) => it)
  const index = targetFragments.findIndex(
    (tfs) =>
      tfs.length === pathFragments.length &&
      tfs.every((v, i) => fragmentEqual(v, pathFragments[i]))
  )
  return pages[index]
}

export default {
  pages,
  menus,
  findPageByPathname,
}
