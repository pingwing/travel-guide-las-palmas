import React from 'react';
import {Component} from 'react';
import MiniPhoto from "./MiniPhoto";
import {connect} from 'react-redux';
import Photo from './Photo';
import { selectMarker, } from '../actions';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase';

class PhotoSlider extends Component {

  onClick = (markerKey) => {
    this.props.dispatch(selectMarker(markerKey))
  };

  render() {

    if (!isLoaded(this.props.markers) || isEmpty(this.props.markers)) return null;

    let markers = [];
    for (const key of Object.keys(this.props.markers)) {
        markers.push(this.props.markers[key]);
    }    

    let currentMarkerObject;
    markers.forEach((marker) => {
      if (marker.key === this.props.currentMarker) {
        currentMarkerObject = marker;
      }
    });

    if (!currentMarkerObject) {
      currentMarkerObject = null;
    } else {
      currentMarkerObject =  markers[0];
    }
    const photo = currentMarkerObject ? <Photo currentMarker={currentMarkerObject}/> : null;
    
    return (
      <div style={{'max-width': '1000px', margin: '0 auto', background: '#568EA3', height: '100%', color: 'white'}} >
        <div className="row">
          <ul className='pagination photoSlider' style={{height: '10%', display: 'inline'}}>
            <li><a style={{marginLeft:'30px'}} href="#">«</a></li>
            {markers.map((marker) => {
              let style = {};
              if (marker.key === this.props.currentMarker) {
                style = {opacity:'.5'}
              }
              return <li><MiniPhoto click={this.onClick} imageUrl={marker.imageUrl} style={style} markerKey={marker.key}/></li>
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

// const mapStateToProps = (state) => {
//   return {
//     markers: state.markers,
//     currentMarker: state.currentMarker
//   };
// };

// export default connect(mapStateToProps)(PhotoSlider);

const fbWrappedPhotoSlider = firebaseConnect([
  '/todos',
  '/markers',
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(PhotoSlider)

export default connect(
  (state) => ({
    todos: dataToJS(state.firebase, 'todos'),
    markers: dataToJS(state.firebase, 'markers'),
    //markers: state.local.markers,
    currentMarker: state.local.currentMarker
  })
)(fbWrappedPhotoSlider)