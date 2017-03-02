export const editMarker = (text) => {
  return {
    type: 'EDIT_MARKER',
    text,
  };
};

export const addMarker = (newMarkers) => {
  return {
    type: 'ADD_MARKER',
    newMarkers,
  };
};

export const deleteMarker = (text) => {
  return {
    type: 'DELETE_MARKER',
    text,
  };
}
