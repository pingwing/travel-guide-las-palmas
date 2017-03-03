import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import localReducer from './localReducer'

const rootReducer = combineReducers({
  firebase,
  local: localReducer,
})

export default rootReducer
