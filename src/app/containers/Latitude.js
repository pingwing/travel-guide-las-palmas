import React from 'react';
import {Component} from 'react';

export default class Latitude extends Component {
  render() {
    return (
      <label>
        <input type="text" readOnly={true}/>
        {lat}
      </label>
    )
  }
}
