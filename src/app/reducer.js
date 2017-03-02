// The todo items
const initialState = {
  markers: [{
    position: {
      lat: 25.0112183,
      lng: 121.52067570000001,
    },
    key: `Taiwan`,
    defaultAnimation: 2,
  }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      console.log('PINGWIN: action', action);
      return {
        ...state,
        markers: action.newMarkers,
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
