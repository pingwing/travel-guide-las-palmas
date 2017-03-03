// The todo items
const initialState = {
  markers: [{
    position: {
      lat: 25.0112183,
      lng: 121.52067570000001,
    },
    key: `Taiwan`,
    defaultAnimation: 2,
    name: '',
    imageUrl: '',
    description: '',
  }],
  currentMarker: '',
  showNewMarkerPanel: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      console.log('PINGWIN: action', action);
      const newMarker = {
        position: action.position,
        defaultAnimation: 2,
        key: Date.now().toString(),
        name: '',
        imageUrl: 'https://media.giphy.com/media/3o6Zti9NTwp5OEJHEc/giphy.gif',
        description: '',
      };
      const nextMarkers = [
        ...state.markers,
        newMarker,
      ];
      return {
        ...state,
        markers: nextMarkers,
        currentMarker: newMarker.key,
        showNewMarkerPanel: true
      };
    case 'EDIT_MARKER_NAME':
      const editedMarkers = state.markers.map((marker) => {
        const markerToReturn = marker;
          if (marker.key === state.currentMarker) {
            markerToReturn.name = action.name;
          }
          return markerToReturn;
      });
      return {
        ...state,
        markers: editedMarkers,
        showNewMarkerPanel: true
      };
    case 'SELECT_MARKER':
      return {
        ...state,
        currentMarker: action.key,
        showNewMarkerPanel: true
      };
    case 'EDIT_MARKER_IMAGE_URL':
      const editedMarkersUrl = state.markers.map((marker) => {
        const markerToReturn = marker;
          if (marker.key === state.currentMarker) {
            markerToReturn.imageUrl = action.imageUrl;
          }
          return markerToReturn;
      });
      return {
        ...state,
        markers: editedMarkersUrl,
        showNewMarkerPanel: true
      };      
    case 'DELETE_MARKER':
      const filteredMarkers = state.markers.filter(function(marker) {
          return marker.key === state.currentMarker ? false : true;
      });
      return {
        ...state,
        markers: filteredMarkers,
        showNewMarkerPanel: false
      };
    case 'SHOW_HIDE_NEW_MARKER_PANEL':
      return {
        ...state,
        showNewMarkerPanel: !state.showNewMarkerPanel
      }
    default:
      return state;
  }
};

export default reducer;
