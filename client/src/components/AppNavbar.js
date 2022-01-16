import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Dropdown,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  state = {
    isOpen: false,
    isOpenDropdown: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
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
          <span className="navbar-text">
            <strong>{user ? `Willkommen ${user.name}` : ""}</strong>
          </span>
        </NavItem>
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

    return (
      <div>
        <Navbar color="dark" dark expand="true">
          <Container>
            <NavbarBrand href="/">Budget Tracker</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="navbarToggler" isOpen={this.state.isOpen}/>

            
            <Collapse isOpen={this.state.isOpen} navbar className="navCollapse">
              <Nav className="" navbar>
                {isAuthenticated ? authLinks : guestLinks}
                <NavItem>
                  <NavLink href="https://github.com/Kanne87">Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>

            <Dropdown className="navbarPageDropdown"isOpen={this.state.isOpenDropdown}  toggle={this.toggleDropdown}>
              <DropdownToggle onClick={this.toggleDropdown} caret>Seiten</DropdownToggle>
              <DropdownMenu container="body" flip={false}>
                <DropdownItem onClick={function noRefCheck() {}} href="#">
                  Budget
                </DropdownItem>
                <DropdownItem onClick={function noRefCheck() {}}>
                  Action 2
                </DropdownItem>
                <DropdownItem onClick={function noRefCheck() {}}>
                  Action 3
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
