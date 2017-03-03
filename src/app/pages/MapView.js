/* global google */
import _ from "lodash";

import {
  default as React,
  Component,
} from "react";

import Helmet from "react-helmet";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from "../../lib";

import {connect} from 'react-redux';
import {
  addMarker,
  selectMarker,
} from '../actions';

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const GoogleMapsComponent = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{lat: 28.114107, lng: -15.431281}}
    onClick={props.onMapClick}
  >
    <Circle center={{lat: 28.114107, lng: -15.431281}} radius={1000}/>
    {props.markers.map(marker => {


      return (
        <span>
        <Marker
          {...marker}
          onClick={() => props.onMarkerClick(marker)}
        />
        </span>
      )
    })}
  </GoogleMap>
));

class MapView extends Component {
  handleMapLoad = (map) => {
    this._mapComponent = map;
    if (map) {
      console.log('ZOOM LEVEL:', map.getZoom());
    }
  };

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick = (event) => {
    const position = event.latLng;
    this.props.dispatch(addMarker(position));

    // if (nextMarkers.length === 3) {
    //   this.props.toast(
    //     `Right click on the marker to remove it`,
    //     `Also check the code!`
    //   );
    // }
  };

  handleMarkerRightClick = (targetMarker) => {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    this.props.dispatch(selectMarker(targetMarker.key));
  };

  render() {
    console.log(this.props.markers);
    return (
      <div style={{height: `100%`}}>
        <Helmet
          title="Travel Guide Las Palmas | React in Flip Flops"
        />
        <GoogleMapsComponent
          containerElement={
            <div style={{height: `100%`}}/>
          }
          mapElement={
            <div style={{height: `100%`}}/>
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.props.markers}
          onMarkerClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    markers: state.markers,
  };
};

export default connect(mapStateToProps)(MapView);
