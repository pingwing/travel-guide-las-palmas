import { createStore, compose } from 'redux'
import { firebase as fbConfig } from './config'
import { reactReduxFirebase } from 'react-redux-firebase'
import localReducer from './localReducer'

export default function configureLocalStore () {
  const localStore = createStore(localReducer);
  return localStore
}
