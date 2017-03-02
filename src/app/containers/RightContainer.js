import React from 'react';
import {Component} from 'react';
import InputComponent from './InputComponent';
import LocationDetails from './LocationDetails';
import Photo from './Photo';
import AddMarker from './AddMarker';

export default class RightContainer extends Component {
  render() {
    return (
      <div className="content">
<p>TEST sdjfakjwvdkhjfwf</p>
        <AddMarker handleNewMarket={this.props.handleNewMarker}/>
        <LocationDetails>
          <InputComponent value={this.props.newMarketLat}/>
          <InputComponent value={this.props.newMarketLng}/>
          <Photo/>
        </LocationDetails>
      </div>
    )
  }
}
