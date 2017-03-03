export const editMarkerName = (name) => {
  return {
    type: 'EDIT_MARKER_NAME',
    name,
  };
};

export const editMarkerImageUrl = (imageUrl) => {
  return {
    type: 'EDIT_MARKER_IMAGE_URL',
    imageUrl,
  };
};

export const addMarker = (position) => {
  return {
    type: 'ADD_MARKER',
    position,
  };
};

export const selectMarker = (key) => {
  return {
    type: 'SELECT_MARKER',
    key,
  };
};

export const deleteMarker = (key) => {
  return {
    type: 'DELETE_MARKER',
    key,
  };
}

export const showHideNewMarkerPanel = () => {
  return {
    type: 'SHOW_HIDE_NEW_MARKER_PANEL'
  };
}
