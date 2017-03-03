import React from 'react';
import {Component} from 'react';
import InputComponent from './InputComponent';
import LocationDetails from './LocationDetails';
import Photo from './Photo';
import AddMarker from './AddMarker';
import {connect} from 'react-redux';
import {
  editMarkerName,
  editMarkerImageUrl
} from '../actions';

class RightContainer extends Component {

  editMarkerName = (evt) => {
      this.props.dispatch(editMarkerName(evt.target.value));
  }

  editMarkerImageUrl = (evt) => {
      this.props.dispatch(editMarkerImageUrl(evt.target.value));
  }  

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

    <div style={{position: 'absolute',
      background: 'aqua',
      height: '100%',
      width: '200px',
      right: '0px',}}>
      <div className="content">
        <LocationDetails>
          <label>Lat:<InputComponent value={currentMarkerObject.position.lat()} /></label>
          <label>Lng:<InputComponent value={currentMarkerObject.position.lng()} /></label>
          <label>Name:<InputComponent value={currentMarkerObject.name} onChange={this.editMarkerName} /></label>
          <label>Image URL:<InputComponent value={currentMarkerObject.imageUrl} onChange={this.editMarkerImageUrl} /></label>
        </LocationDetails>
      </div>
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
