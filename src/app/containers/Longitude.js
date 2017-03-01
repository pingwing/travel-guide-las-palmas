import React from 'react';
import {Component} from 'react';

export default class Longitude extends Component {
  render() {
    return (
      <label>
        <input type="text" readOnly={true}/>
        {long}
      </label>
    )
  }
}
