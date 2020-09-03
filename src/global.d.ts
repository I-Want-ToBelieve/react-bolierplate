// https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E5%9F%BA%E7%A1%80
// https://jkchao.github.io/typescript-book-chinese/project/modules.html#global-d-ts
// https://github.com/vuejs/vue-next/blob/master/tsconfig.json#L28

// https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E4%BB%8B%E7%BB%8D
// https://github.com/microsoft/TypeScript/blob/667f3b411e91500603449efd06991144f5279c31/lib/lib.es5.d.ts#L1496
declare type ReactFCProps<F extends Function> = F extends (
  props: infer P
) => React.ReactElement | null
  ? P
  : never

// https://jkchao.github.io/typescript-book-chinese/typings/lib.html#window
// declare global {
//   interface Window {
//   }
// }
