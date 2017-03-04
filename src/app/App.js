import {
  default as React,
  Component,
} from "react";

import {
  Application,
} from "./containers";

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import configureStore from './store'

const initialState = window.__INITIAL_STATE__ || {firebase: { authError: null }}

const store = configureStore(reducer, initialState)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}


