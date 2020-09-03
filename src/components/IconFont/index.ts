import { createFromIconfontCN } from '@ant-design/icons'

// https://stackoverflow.com/questions/54706996/difference-between-react-functioncomponent-and-react-sfc
// <IconFont type="icon-example" />
const IconFont = createFromIconfontCN({
  // 在 iconfont.cn 上生成
  scriptUrl: '//at.alicdn.com/t/font_1698273_x2fhivx6gg.js',
  // https://ant.design/components/icon-cn/#%E8%87%AA%E5%AE%9A%E4%B9%89-font-%E5%9B%BE%E6%A0%87
  extraCommonProps: {},
})

export default IconFont
