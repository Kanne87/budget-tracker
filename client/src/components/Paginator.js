import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Home from "../pages/Home";
import Einstellungen from "../pages/Einstellungen";
import Monitor from "../pages/Monitor";
import Dashboard from "../pages/Dashboard";

class Paginator extends Component {
  render() {
    const { page } = this.props.budget;
    return (
      <Fragment>
        {page === 1 && <Home />}
        {page === 2 && <Monitor />}
        {page === 3 && <Einstellungen />}
        {page === 4 && <Dashboard />}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  budget: state.budget,
  auth: state.auth,
});

export default connect(mapStateToProps)(Paginator);
