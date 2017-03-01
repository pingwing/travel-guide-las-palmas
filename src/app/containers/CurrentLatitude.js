import React from 'react';
import {Component} from 'react';

export default class CurrentLatitude extends Component {

  render() {
    const {lat} = this.props;
    return (
    <label>
      <input type="text" readOnly={true}/>
      {lat}
    </label>

    )
  }
}
