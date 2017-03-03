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

import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

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

let markers = [];
for (const key of Object.keys(props.markers)) {
    markers.push(props.markers[key]);
}

  return (<GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    center={props.center}
    onClick={props.onMapClick}
  >
    <Circle center={{lat: 28.114107, lng: -15.431281}} radius={1000}/>
    { markers.map(marker => {
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
    const position = {lat: event.latLng.lat(), lng: event.latLng.lng()};
    const { firebase } = this.props

    const newMarker = {
      position,
      defaultAnimation: 2,
      key: Date.now().toString(),
      name: '',
      imageUrl: 'https://media.giphy.com/media/3o6Zti9NTwp5OEJHEc/giphy.gif',
      description: '',
    };    

    console.log(newMarker);

    firebase.push('/markers', newMarker)

    //this.props.dispatch(addMarker(position));

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
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

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

// const mapStateToProps = (state) => {
//   return {
//     markers: state.markers,
//   };
// };

// export default connect(mapStateToProps)(MapView);

const fbWrappedMapView = firebaseConnect([
  '/todos',
  '/markers',
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(MapView)

export default connect(
  (state) => ({
    todos: dataToJS(state.firebase, 'todos'),
    markers: dataToJS(state.firebase, 'markers'),
    //markers: state.local.markers
  })
)(fbWrappedMapView)

