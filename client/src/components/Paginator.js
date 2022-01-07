import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../pages/Home";
import Monitor from "../pages/Monitor";
import openBudget from "../pages/pages";

class Paginator extends Component {
  render() {
    return (
      <div>
        {this.props.budget.page === 1 && <Home />} 
        {this.props.budget.page === 2 && <Monitor />}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  budget: state.budget,
});

export default connect(mapStateToProps)(Paginator);
