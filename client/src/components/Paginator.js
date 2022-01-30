import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {getLabels } from "../actions/labelActions";
import Home from "../pages/Home";
import Einstellungen from "../pages/Einstellungen";
import Monitor from "../pages/Monitor";

class Paginator extends Component {
  componentDidMount() {
    const  userId  = this.props.auth.user._id;
  }
  render() {
    return (
      <Fragment> 
        {this.props.budget.page === 1 && <Home />} 
        {this.props.budget.page === 2 && <Monitor />}
        {this.props.budget.page === 3 && <Einstellungen />}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  budget: state.budget,
  auth: state.auth,
});

export default connect(mapStateToProps)(Paginator);
