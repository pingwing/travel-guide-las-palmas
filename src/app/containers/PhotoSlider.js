import React from 'react';
import {Component} from 'react';
import MiniPhoto from "./MiniPhoto";
import {connect} from 'react-redux';
import Photo from './Photo';
import { selectMarker, } from '../actions';

class PhotoSlider extends Component {
  onClick = (markerKey) => {
    console.log('PINGWIN: markerKey', markerKey);
    this.props.dispatch(selectMarker(markerKey))
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
    return (
      <div className="full-height" style={{'max-width': '1000px', margin: '0 auto', background: '#F26419'}} >
        <div className="row">
          <ul className='pagination photoSlider' style={{height: '10%', display: 'inline'}}>
            <li><a style={{marginLeft:'30px'}} href="#">«</a></li>
            {this.props.markers.map((marker) => {
              return <li><a href="#"><MiniPhoto click={this.onClick} imageUrl={marker.imageUrl} markerKey={marker.key}/></a></li>
            })}
            <li><a style={{float: 'right', marginRight: '30px'}} href="#">»</a></li>
          </ul>
        </div>
          <div className="row container-bottom">
            {photo}
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

export default connect(mapStateToProps)(PhotoSlider);
