import React from 'react';
import {Component} from 'react';
import PossitionDetails from './PossitionDetails';
import CurrentLatitude from './CurrentLatitude';
import CurrentLongitude from './CurrentLongitude';
import Latitude from './Latitude';
import Longitude from './Longitude';
import LocationDetails from './LocationDetails';
import Photo from './Photo';
import SubmitButton from './SubmitButton';

export default class RightContainer extends Component {
  render() {
    return(
      <div>
        <PossitionDetails>
          <CurrentLatitude/>
          <CurrentLongitude/>
          <SubmitButton/>
        </PossitionDetails>

        <LocationDetails>
          <Latitude/>
          <Longitude/>
          <Photo/>
        </LocationDetails>

      </div>
    )
  }

}
