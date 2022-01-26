import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Home from "../pages/Home";
import Einstellungen from "../pages/Einstellungen";
import Monitor from "../pages/Monitor";

class Paginator extends Component {
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
});

export default connect(mapStateToProps)(Paginator);
