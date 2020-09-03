// https://easy-peasy.now.sh/docs/typescript-tutorial/create-your-store.html#interface-declaration
import universeModel, { UniverseModel } from './universe.model'

export interface StoreModel {
  universe: UniverseModel
}

export const storeModel: StoreModel = {
  universe: universeModel,
}
