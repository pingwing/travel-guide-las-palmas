import React from 'react';
import {Component} from 'react';

export default class MiniPhoto extends Component {
  render() {
    return (<div onClick={this.props.click}>
      <img role="presentation" className="col col-lg image pull-left" style={{height:'20px',}} src={this.props.imageUrl}/>
      </div>
    )
  }
}
