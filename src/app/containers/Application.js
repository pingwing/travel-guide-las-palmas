import {
  default as React,
  Component,
  PropTypes,
  Children,
} from "react";

import {
  Link,
} from "react-router";

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";

import {
  LinkContainer,
} from "react-router-bootstrap";

import GitHubForkRibbon from "react-github-fork-ribbon";

import {
  ToastContainer,
  ToastMessage,
} from "react-toastr";

import {
  PrismCode,
} from "react-prism";

import Helmet from "react-helmet";
import RightContainer from './RightContainer'
export default class Application extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

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
          <Nav>
            <NavDropdown id="examples-dropdown" title="Options">
              <LinkContainer to="/basics/pop-up-window"><MenuItem>Insert new place</MenuItem></LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className="container-fluid full-height" style={{height: "56.4%",}}>

          <div className="row full-height">
            <div className="col" style={{height: `100%`, padding: '0', width: '80%', float: 'left'}}>
              {React.cloneElement(Children.only(this.props.children), {
                toast: this.handleToast,
              })}
            </div>
            <div className="col">
              <RightContainer />
            </div>
          </div>
        </div>
        <div className="navbar navbar-default navbar-fixed-bottom" style={{height: "40%",}}>
          <div className="container" style={{}}>
            hdfliajdfkjwefkjsd
          </div>
        </div>
      </div>
    );
  }
}
