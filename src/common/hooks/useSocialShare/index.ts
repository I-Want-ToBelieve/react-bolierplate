import { useMemo } from 'react'

// ref: https://sourcegraph.com/github.com/overtrue/share.js/-/blob/src/js/social-share.js#L55:9
// more: https://github.com/nygardk/react-share
export interface Templates {
  qzone: string
  qq: string
  weibo: string
  douban: string
}
// https://github.com/overtrue/share.js#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E7%BD%AE
export interface Args {
  url?: string
  source?: string
  title?: string
  description?: string
  summary?: string
  image?: string
  weibokey?: string
}
export type useSocialShare = (args?: Args) => Templates
export const useSocialShare: useSocialShare = (args = {}) => {
  const {
    url = process.env.NODE_ENV === 'development'
      ? 'https://www.github.com/'
      : window.location.href,
    source = (document.getElementsByName('site')[0] as HTMLMetaElement)
      ?.content ?? document.title,
    title = document.title,
    description = (document.getElementsByName(
      'description'
    )[0] as HTMLMetaElement)?.content ?? '',
    summary = (document.getElementsByName('description')[0] as HTMLMetaElement)
      ?.content ?? '',
    image = document.images[0].src ?? '',
    weibokey = '',
  } = args

  return useMemo(
    () => ({
      qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(
        url
      )}&title=${title}&desc=${description}&summary=${summary}&site=${source}&pics=${image}`,
      qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}&pics=${image}&summary="${summary}"`,
      weibo: `https://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}&appkey=${weibokey}`,
      douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
    }),
    [description, image, source, summary, title, url, weibokey]
  )
}

export default useSocialShare
