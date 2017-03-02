import React from 'react';
import {Component} from 'react';

export default class MiniPhoto extends Component {
  render() {
    return (<div>
      <img role="presentation" className="col col-lg image pull-left" style={{height:'20px',}} src="https://media.giphy.com/media/3o6Zti9NTwp5OEJHEc/giphy.gif"/>
      </div>
    )
  }
}
