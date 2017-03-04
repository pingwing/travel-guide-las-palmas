import {
  default as React,
  Component,
} from "react";

import {
  Link,
} from "react-router";

import {
  Navbar,
} from "react-bootstrap";

import {
  MapView,
} from "../pages";

import Helmet from "react-helmet";
import RightContainer from './RightContainer';
import PhotoSlider from './PhotoSlider';
export default class Application extends Component {

  handleToast = this.handleToast.bind(this);

  handleToast(title, message) {
    this.refs.toast.success(title, message);
  }

  componentDidMount() {
    window.ReactGoogleMapsToast = this.handleToast; // For AsyncApp
  }

  render() {
    return (
      <div className="full-height">
        <Helmet
          meta={[
            {name: `viewport`, content: `width=device-width, initial-scale=1`},
            {name: `description`, content: `react-google-maps example application`},
            {property: `og:type`, content: `article`},
          ]}
        />
        <Navbar fluid style={{margin: '0'}}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Travel Guide Las Palmas</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div className="container-fluid full-height" style={{height: "56.4%",}}>

          <div className="row full-height">
            <div className="col" style={{height: `100%`, padding: '0', width: '100%', float: 'left'}}>
              <MapView toast={this.handleToast}/>
            </div>
            <RightContainer />
          </div>
        </div>
        <div className="navbar navbar-default navbar-fixed-bottom" style={{height: "40%", 'background': '#FFE8D1'}}>
          <PhotoSlider />
        </div>
      </div>
    );
  }
}
