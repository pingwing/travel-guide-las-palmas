import React from 'react';
import {Component} from 'react';

export default class InputComponent extends Component {
  onChange
  render() {
    const {readOnly} = this.props;
    const {value} = this.props;
    const {onChange} = this.props;
    return (
      <form>
        <input className="input modalInput" type="text" readOnly={readOnly} value={value} onChange={onChange}/>
      </form>
    )
  }
}
