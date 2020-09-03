// https://easy-peasy.now.sh/docs/typescript-tutorial/create-your-store.html#creating-the-store
import { createStore } from 'easy-peasy'
import { storeModel } from './model'

// https://github.com/ctrlplusb/easy-peasy/issues/304 Easy Peasy + React Router + TypeScript integration
const store = createStore(storeModel)

export default store
