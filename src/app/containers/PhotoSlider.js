import React from 'react';
import {Component} from 'react';
import MiniPhoto from "./MiniPhoto";

export default class PhotoSlider extends Component {
  render() {
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
