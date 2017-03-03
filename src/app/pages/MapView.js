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

import Modal from 'react-modal';
import InputComponent from '../containers/InputComponent';
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

  const walkingRadius = ((parseFloat(props.howManyHours)-0.2)*7000)/2;
  console.log('PINGWIN: walkingRadius', walkingRadius);

  const humanIcon = `${process.env.PUBLIC_URL}/humanIcon.png`;
  const circle = <Circle radius={walkingRadius} center={props.center} onClick={props.onMapClick}/>;
  const marker = <Marker
    position={props.center}
    icon={humanIcon}
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
  )
});

class MapView extends Component {
  state = {
    center: {lat: 28.114107, lng: -15.431281},
    radius: 6000,
    modalIsOpen: true,
    howManyHours: '2',
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

  handleMarkerClick = (targetMarker) => {
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

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  editMarkerDescription = (evt) => {
    this.setState({howManyHours: evt.target.value});
  };

  render() {
    const customModalStyles = {overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
      content : {
        position                   : 'absolute',
        top                        : '300px',
        left                       : '300px',
        right                      : '300px',
        bottom                     : '300px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'

      }};
    return (
      <div style={{height: `100%`}}>
        <Helmet
          title="Travel Guide Las Palmas | React in Flip Flops"
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Hello Modal"
          style={customModalStyles}
        >
          <div className="row">
            <h2 style={{display:'inline'}} ref="subtitle">Hello traveller!</h2>
          </div>
          <p style={{display:'inline'}}>How much time do you have? </p>
          <InputComponent style={{display:'inline'}} value={this.state.howManyHours} onChange={this.editMarkerDescription}/>
          <p style={{display:'inline'}}> hours</p>
          <button className="btn btn-success" onClick={this.closeModal}>Start EXPLORING!</button>
        </Modal>
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
          onMarkerClick={this.handleMarkerClick}
          center={this.state.center}
          howManyHours={this.state.howManyHours}
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
