import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Home from "../pages/Home";
import Monitor from "../pages/Monitor";
import Splash from "../pages/Splash";

class Paginator extends Component {
  render() {
    return (
      <Fragment> 
        {this.props.budget.page === 1 && <Home />} 
        {this.props.budget.page === 2 && <Monitor />}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  budget: state.budget,
});

export default connect(mapStateToProps)(Paginator);
