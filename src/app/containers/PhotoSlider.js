import React from 'react';
import {Component} from 'react';
import MiniPhoto from "./MiniPhoto";
import {connect} from 'react-redux';
import Photo from './Photo';

class PhotoSlider extends Component {
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
    return (
      <div>
        <ul className='pagination photoSlider' style={{height: '10%', display: 'inline'}}>
          <li><a href="#">«</a></li>
          {this.props.markers.map((marker) => {
            return <li><a href="#"><MiniPhoto imageUrl={marker.imageUrl}/></a></li>
          })}
          <li><a href="#">»</a></li>

        </ul>
        <div className="container-bottom pull-left ">
          <Photo currentMarker={currentMarkerObject}/>
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
