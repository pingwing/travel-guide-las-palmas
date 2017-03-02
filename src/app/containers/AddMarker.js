import React from 'react';
import {Component} from 'react';
import PossitionDetails from './PossitionDetails';
import InputComponent from './InputComponent';
import SubmitButton from './SubmitButton';

export default class AddMarker extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleNewMarker}>
          <PossitionDetails>
            <InputComponent/>
            <InputComponent/>
            <SubmitButton/>
          </PossitionDetails>
        </form>
      </div>
    )
  }
}