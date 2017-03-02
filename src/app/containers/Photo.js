import React from 'react';
import {Component} from 'react';

export default class Photo extends Component {
  render() {
    return (<div>
        <p>name</p>
      <img role="presentation" className="col col-lg image pull-left" src="https://media.giphy.com/media/3o6Zti9NTwp5OEJHEc/giphy.gif"/>
      </div>
    )
  }
}
