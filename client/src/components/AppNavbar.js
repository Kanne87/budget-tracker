import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { switchPage } from "../actions/budgetActions";

class AppNavbar extends Component {
  state = {
    isOpen: false,
    isOpenDropdown: false,
    page: 0
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  switchPage = (e) => {
    this.props.switchPage(e.target.id);
    };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  toggleDropdown = () => {
    this.setState({
      isOpenDropdown: !this.state.isOpenDropdown,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    const pageLinks = (
      <Fragment>
        <NavItem>
          <NavLink onClick={this.switchPage} id="Budget" className="navListItem">
            Budgets
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.switchPage} id="Monitor" className="navListItem">
            Monitor
          </NavLink>
        </NavItem>
    </Fragment>
    );

    return (
      <Fragment>
        <Navbar color="dark" dark expand="md" className="shadow">
          
            <NavbarBrand href="/">Budget Tracker</NavbarBrand>
            <NavbarToggler
              onClick={this.toggle}
              isOpen={this.state.isOpen}
            />
            <Collapse isOpen={this.state.isOpen} navbar >
              <Nav className="me-auto" navbar>
                {isAuthenticated && pageLinks}
              </Nav>
              <NavbarText className="navbar-text">
            <strong>{user ? `Willkommen ${user.name}` : ""}</strong>
          </NavbarText>
          <Nav navbar>
          {isAuthenticated ? authLinks : guestLinks}
          </Nav>
            </Collapse> 
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { switchPage })(AppNavbar);
