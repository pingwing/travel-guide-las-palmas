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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      console.log('PINGWIN: action', action);
      const newMarker = {
        position: action.position,
        defaultAnimation: 2,
        key: Date.now().toString(), // Add a key property for: http://fb.me/react-warning-keys
        name: '',
        imageUrl: '',
        description: '',
      };
      const nextMarkers = [
        ...state.markers,
        newMarker,
      ];
      return {
        ...state,
        markers: nextMarkers,
        currentMarker: newMarker.key
      };
    case 'EDIT_MARKER':
      return {
        items: state.items.concat([{
          text: state.inputValue,
          checked: false,
        }]),
        inputValue: '',
      };
    case 'DELETE_MARKER':
      return {
        ...state,
        inputValue: action.text,
      };
    default:
      return state;
  }
};

export default reducer;
