import React from 'react';
import {Component} from 'react';
import InputComponent from './InputComponent';
import LocationDetails from './LocationDetails';
import Photo from './Photo';
import AddMarker from './AddMarker';
import {connect} from 'react-redux';

class RightContainer extends Component {
  render() {
    console.log('RightContainer props',this.props);
    let currentMarkerObject;
    this.props.markers.forEach((marker) => {
      if (marker.key === this.props.currentMarker) {
        currentMarkerObject = marker;
      }
    })
    console.log('currentMarker', currentMarkerObject);
    if (!currentMarkerObject) return null;
    return (
      <div className="content">
        <LocationDetails>
          <label>Lat:<InputComponent value={currentMarkerObject.position.lat()} /></label>
          <label>Lng:<InputComponent value={currentMarkerObject.position.lng()} /></label>
          <Photo/>
        </LocationDetails>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    markers: state.markers,
    currentMarker: state.currentMarker
  };
};

export default connect(mapStateToProps)(RightContainer);