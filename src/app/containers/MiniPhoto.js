import React from 'react';
import {Component} from 'react';

export default class MiniPhoto extends Component {

  onClickHandler = () => {
    console.log('PINGWIN: this.props', this.props);
    this.props.click(this.props.markerKey);
  };

  render() {
    return (<div onClick={this.onClickHandler}>
        <img role="presentation" className="col col-lg image pull-left" style={{height: '20px',}}
             src={this.props.imageUrl}/>
      </div>
    )
  }
}
