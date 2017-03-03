import {
  default as React,
  Component,
} from "react";

import {
  Application,
} from "./containers";

import { Provider } from 'react-redux';
import reducer from './reducer';
import { createStore, compose } from 'redux'
import reducerFirebase from './reducerFirebase'
import { reduxFirebase } from 'react-redux-firebase'

// Replace with your Firebase config
const fbConfig = {
  apiKey: 'AIzaSyCXS2Ka_o3p9OPg93pNNrMgvXUXEajLkNg',
  authDomain: 'travel-guide-las-palmas.firebaseapp.com',
  databaseURL: 'https://travel-guide-las-palmas.firebaseio.com'
}

const store = createStore(reducer);

export function configureStore (initialState, history) {
  const createStoreWithMiddleware = compose(
    reduxFirebase(fbConfig, { userProfile: 'users' }),
    // Redux Devtools
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)
  const storeFirebase = createStoreWithMiddleware(reducerFirebase)
// if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('./reducer', () => {
//       const nextRootReducer = require('./reducer')
//       store.replaceReducer(nextRootReducer)
//     })
//   }
  return storeFirebase
}
const storeFirebase = configureStore({}, {})

export default class App extends Component {
  render() {
    return (
      <Provider store={store} storeFirebase={storeFirebase} >
        <Application />
      </Provider>
    );
  }
}

