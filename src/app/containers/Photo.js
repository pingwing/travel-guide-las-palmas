import React from 'react';
import {Component} from 'react';

export default class Photo extends Component {
  render() {
    if (!this.props.currentMarker || !this.props.currentMarker.name) return null;
    return (<div>
        <p>{this.props.currentMarker.name}</p>
      <img role="presentation" className="col col-lg image pull-left" src={this.props.currentMarker.imageUrl}/>
      </div>
    )
  }
}
