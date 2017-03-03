import React from 'react';
import {Component} from 'react';

export default class Photo extends Component {
  render() {
    return (<div className="row">
        <p className="name row" style={{height:'10px', marginLeft:'5em'}}>{this.props.currentMarker.name}</p>
        <div className="row">
          <img role="presentation" className="col col-md-3 image pull-left" style={{marginLeft:'5em', maxHeight:'200px'}}
               src={this.props.currentMarker.imageUrl}/>
          <div className="row">
            <label> Description:</label>
            <div className="row">
              <p>
                {this.props.currentMarker.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
