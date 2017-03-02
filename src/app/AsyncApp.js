import {
  default as React,
  Component,
} from "react";

import {
  AsyncMapView,
} from "./pages/async";

export default class AsyncApp extends Component {

  handleToast = this.handleToast.bind(this);

  handleToast(...args) {
    window.parent.ReactGoogleMapsToast(...args); // See Application
  }

  render() {
    return (
      <AsyncMapView
        toast={this.handleToast}
      />
    );
  }
}
