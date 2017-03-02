import React from 'react';
import {Component} from 'react';
import PossitionDetails from './PossitionDetails';
import InputComponent from './InputComponent';
import LocationDetails from './LocationDetails';
import Photo from './Photo';
import SubmitButton from './SubmitButton';

export default class RightContainer extends Component {
  render() {
    return(
      <div className="content">
        <p>TEST sdjfakjwvdkhjfwf</p>
        <PossitionDetails>
          <InputComponent/>
          <InputComponent/>
          <SubmitButton/>
        </PossitionDetails>

        <LocationDetails>
          <InputComponent/>
          <InputComponent/>
          <Photo/>
        </LocationDetails>

      </div>
    )
  }

}
