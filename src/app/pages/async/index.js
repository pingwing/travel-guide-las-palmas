import AsyncMapView from "./AsyncMapView";

import PageWithIframeEntry from "./PageWithIframeEntry";

PageWithIframeEntry.__raw = require(`!raw!./AsyncMapView`);

export {
  AsyncMapView,
  PageWithIframeEntry,
};
