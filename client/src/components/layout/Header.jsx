import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {signout} from "../../actions/auth";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {NavItem} from "react-bootstrap";

class Header extends Component {
  render() {
    const {isAuthenticated, user} = this.props.auth;

    const guestLinks = (
      <Nav pullRight>
        <LinkContainer to="/signin">
          <NavItem eventKey={1}>
            <div className="header-link-container">
            <i className="fas fa-sign-alt"></i>
              <span className="icon-description">Connexion</span>
            </div>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/signup">
          <NavItem eventKey={1}>
            <div className="header-link-container">
            <i className="fas fa-user-plus"></i>
              <span className="icon-description">Inscription</span>
            </div>
          </NavItem>
        </LinkContainer>
      </Nav>
    );

    const userLinks = (
      <Nav pullRight>
        <LinkContainer to="/profile">
          <NavItem eventKey={1}>
            <div className="header-link-container">
            <i className="fas fa-user"></i>
              <span className="icon-description">Profil</span>
            </div>
          </NavItem>
        </LinkContainer>
        <NavItem eventKey={1} onClick={() => this.props.signout()}>
          <div className="header-link-container">
          <i className="fas fa-sign-out-alt"></i>
              <span className="icon-description">Déconnexion</span>
            </div>

        </NavItem>
      </Nav>
    );

    const appLinks = (
      <Nav>
        <LinkContainer to="/chat">
          <NavItem eventKey={1}>
            <div className="header-link-container">
            <i className="fas fa-comment"></i>
            <span className="icon-description">Chat</span>
          </div>
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/polls">
          <NavItem eventKey={1}>
            <div className="header-link-container">
            <i className="fas fa-chart-bar"></i>
              <span className="icon-description">Sondages</span>
            </div>
          </NavItem>
        </LinkContainer>
        {isAuthenticated && (
          <LinkContainer to="/management">
            <NavItem eventKey={1}>
              <div className="header-link-container">
              <i className="fas fa-table"></i>
                <span className="icon-description">Gestion</span>
              </div>
            </NavItem>
          </LinkContainer>
        )}
      </Nav>
    );

    return (
      <Navbar
        inverse
        collapseOnSelect
        fluid
        style={{
        borderRadius: "0px"
      }}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ArcadiaA</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          {appLinks}
          {isAuthenticated
            ? userLinks
            : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({auth: state.auth});

const mapDispatchToProps = dispatch => bindActionCreators({
  signout
}, dispatch);

Header = withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

export default Header;
