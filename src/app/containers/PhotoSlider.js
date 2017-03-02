import React from 'react';
import {Component} from 'react';
import MiniPhoto from "./MiniPhoto";
import {connect} from 'react-redux';

class PhotoSlider extends Component {
  render() {
    console.log('PINGWIN: this.props', this.props);
    return (
      <ul className='pagination photoSlider' style={{height: '10%',display:'inline'}}>
        <li><a href="#">«</a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#"><MiniPhoto/></a></li>
        <li><a href="#">»</a></li>

      </ul>
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
