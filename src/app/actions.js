export const editMarker = (text) => {
  return {
    type: 'EDIT_MARKER',
    text,
  };
};

export const addMarker = (position) => {
  return {
    type: 'ADD_MARKER',
    position,
  };
};

export const deleteMarker = (text) => {
  return {
    type: 'DELETE_MARKER',
    text,
  };
}
