import React from 'react';
import {Component} from 'react';
import MiniPhoto from "./MiniPhoto";
import {connect} from 'react-redux';
import Photo from './Photo';
import selectMarker from '../actions';
import { firebase, helpers } from 'react-redux-firebase'

const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers

class PhotoSlider extends Component {
  onClick = (evt) => {
    this.props.dispatch(selectMarker(evt.target.key))
  };

  render() {

    let currentMarkerObject;
    this.props.markers.forEach((marker) => {
      if (marker.key === this.props.currentMarker) {
        currentMarkerObject = marker;
      }
    });
    if (!currentMarkerObject) currentMarkerObject = this.props.markers[0];
    console.log('currentMarker', currentMarkerObject);
    console.log('PINGWIN: this.props', this.props);
    const photo = currentMarkerObject ? <Photo currentMarker={currentMarkerObject}/> : null;

  //firebase.push('/messages', { text: Date.now().toString()});

    return (
      <div>
        <div className="row">
          <ul className='pagination photoSlider' style={{height: '10%', display: 'inline'}}>
            <li><a href="#">«</a></li>
            {this.props.markers.map((marker) => {
              return <li><a href="#"><MiniPhoto click={this.onClick} imageUrl={marker.imageUrl}/></a></li>
            })}
            <li><a href="#">»</a></li>
          </ul>
        </div>
        <div className="row">
          <div className="container-bottom pull-left ">
            {photo}
          </div>
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
 
const ComponentWithRedux = connect(mapStateToProps)(PhotoSlider);

const fbWrappedComponent = firebase([
  '/message'
])(ComponentWithRedux)

export default connect(
  ({firebase}) => ({
    message: dataToJS(firebase, 'message'),
  })
)(fbWrappedComponent)
