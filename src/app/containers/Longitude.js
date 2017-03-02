import React from 'react';
import {Component} from 'react';

export default class Longitude extends Component {
  render() {
    const {long} = this.props;
    return (
      <label>
        <input type="text" readOnly={true}/>
        {long}
      </label>
    )
  }
}
