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

import canUseDOM from "can-use-dom";

import raf from "raf";

const geolocation = (
  canUseDOM && navigator.geolocation ?
    navigator.geolocation :
    ({
      getCurrentPosition(success, failure) {
        failure(`Your browser doesn't support geolocation.`);
      },
    })
);

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */

const GoogleMapsComponent = withGoogleMap(props => {

  const circle = <Circle radius={1000} center={props.center} onClick={props.onMapClick}/>;
  const marker = <Marker
    position={props.center}
  />;
  //circle.bindTo('center', marker, 'position');

  return (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    center={props.center}
    onClick={props.onMapClick}
  >
    {marker}
    {circle}

    {props.markers.map(marker => {
      return (
        <Marker
          {...marker}
          onClick={() => props.onMarkerClick(marker)}
        />
      )
    })}
  </GoogleMap>
)});

class MapView extends Component {
  state = {
    center: {lat: 28.114107, lng: -15.431281},
    radius: 6000,
  };

  isUnmounted = false;
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

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({radius: Math.max(this.state.radius - 20, 0)});

      if (this.state.radius > 200) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Location found using HTML5.`,
      });

      raf(tick);
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {lat: 28.114107, lng: -15.431281},
        content: `Error: The Geolocation service failed (${reason}).`,
      });
    });
  }

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
          center={this.state.center}
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
