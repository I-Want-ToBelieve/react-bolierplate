// https://easy-peasy.now.sh/docs/typescript-tutorial/adding-typed-actions.html
import { Action, action, Thunk, thunk } from 'easy-peasy' // 👈 import the type

export interface UniverseModel {
  navigationVisible: boolean
  count: number
  increment: Action<UniverseModel, void> // 👈 declaring our action
  decrement: Action<UniverseModel, void>
  incrementAsync: Thunk<UniverseModel> // https://easy-peasy.now.sh/docs/typescript-tutorial/adding-typed-thunks.html
  setNavigation: Action<UniverseModel, boolean>
  toggleNavigation: Action<UniverseModel>
}

const universeModel: UniverseModel = {
  navigationVisible: true,
  count: 0,
  increment: action((state) => {
    state.count += 1
  }),
  decrement: action((state) => {
    state.count -= 1
  }),
  incrementAsync: thunk(async (actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    actions.increment()
  }),
  setNavigation: action((state, payload) => {
    state.navigationVisible = payload
  }),
  toggleNavigation: action((state) => {
    state.navigationVisible = !state.navigationVisible
  }),
}

export default universeModel
