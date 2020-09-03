// https://easy-peasy.now.sh/docs/typescript-tutorial/typed-hooks.html#exporting-the-typed-hooks
import { createTypedHooks } from 'easy-peasy' // 👈import the helper
import { StoreModel } from 'common/helper/easy-peasy/model' // 👈 import our model type

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<StoreModel>()

// 👇 export the typed hooks
export const { useStoreActions } = typedHooks
export const { useStoreDispatch } = typedHooks
export const { useStoreState } = typedHooks
