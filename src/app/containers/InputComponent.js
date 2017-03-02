import React from 'react';
import {Component} from 'react';

export default class InputComponent extends Component {
  render() {
    const {readOnly} = this.props;
    const {value} = this.props;
    return (
      <form>
        <input className="input" type="text" readOnly={readOnly} value={value}/>
      </form>
    )
  }
}
