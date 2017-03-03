import React from 'react';
import {Component} from 'react';
import InputComponent from './InputComponent';
import LocationDetails from './LocationDetails';
import Photo from './Photo';
import AddMarker from './AddMarker';
import {connect} from 'react-redux';
import {
  editMarkerName,
  editMarkerImageUrl,
  showHideNewMarkerPanel,
  editMarkerDescription,
  deleteMarker,
  hideNewMarkerPanel
} from '../actions';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase';

class RightContainer extends Component {

  editMarkerName = (evt) => {
    this.props.dispatch(editMarkerName(evt.target.value));
  }
  editMarkerDescription = (evt) => {
    this.props.dispatch(editMarkerDescription(evt.target.value));
  }

  editMarkerImageUrl = (evt) => {
    this.props.dispatch(editMarkerImageUrl(evt.target.value));
  }

  showHideNewMarkerPanel = (evt) => {
    this.props.dispatch(showHideNewMarkerPanel());
  }

  deleteMarker = (evt) => {
    this.props.dispatch(deleteMarker());
  }

  handleOnMouseLeave = (evt) => {
    this.props.dispatch(hideNewMarkerPanel());
  }

  render() {
    console.log('RightContainer props', this.props);
    let currentMarkerObject;
    this.props.markers.forEach((marker) => {
      if (marker.key === this.props.currentMarker) {
        currentMarkerObject = marker;
      }
    })
    console.log('currentMarker', currentMarkerObject);
    if (!currentMarkerObject || !this.props.showNewMarkerPanel) return null;
    return (
      <div onMouseLeave={this.handleOnMouseLeave} style={{position: 'absolute',
      backgroundColor: 'rgba(0,100,100,0.2)',
      height: '100%',
      width: '200px',
      right: '0px',}}>
        <div className="content">
          <LocationDetails>
            <label>Lat:<InputComponent value={currentMarkerObject.position.lat()}/></label>
            <label>Lng:<InputComponent value={currentMarkerObject.position.lng()}/></label>
            <label>Name:<InputComponent value={currentMarkerObject.name} onChange={this.editMarkerName}/></label>
            <label>Description:<InputComponent value={currentMarkerObject.description} onChange={this.editMarkerDescription}/></label>
            <label>Image URL:<InputComponent value={currentMarkerObject.imageUrl} onChange={this.editMarkerImageUrl}/></label>.
            <button className="btn btn-warning hideRight" onClick={this.showHideNewMarkerPanel}>Hide</button>
            <button className="btn btn-danger delete" onClick={this.deleteMarker}>Delete</button>
          </LocationDetails>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     markers: state.markers,
//     currentMarker: state.currentMarker,
//     showNewMarkerPanel: state.showNewMarkerPanel
//   };
// };

// export default connect(mapStateToProps)(RightContainer);

const fbWrappedRightContainer = firebaseConnect([
  '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(RightContainer)

export default connect(
  (state) => ({
    todos: dataToJS(state.firebase, 'todos'),
    markers: state.local.markers,
    currentMarker: state.local.currentMarker,
    showNewMarkerPanel: state.local.showNewMarkerPanel
  })
)(fbWrappedRightContainer)
