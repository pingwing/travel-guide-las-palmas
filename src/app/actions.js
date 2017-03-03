export const editMarkerName = (text) => {
  return {
    type: 'EDIT_MARKER_NAME',
    text,
  };
};

export const editMarkerDescription = (text) => {
  return {
    type: 'EDIT_MARKER_DESCRIPTION',
    text,
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

export const deleteMarker = () => {
  return {
    type: 'DELETE_MARKER'
  };
}

export const showHideNewMarkerPanel = () => {
  return {
    type: 'SHOW_HIDE_NEW_MARKER_PANEL'
  };
}

export const hideNewMarkerPanel = () => {
  return {
    type: 'HIDE_NEW_MARKER_PANEL'
  };
}
