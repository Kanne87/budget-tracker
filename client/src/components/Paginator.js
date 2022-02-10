import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Home from "../pages/Home";
import Einstellungen from "../pages/Einstellungen";
import Monitor from "../pages/Monitor";
import Dashboard from "../pages/Dashboard";
import { getBudgets } from "../actions/budgetActions";
import { getLabels} from "../actions/labelActions";
import { getMatches } from "../actions/matchActions";
import { getDebits } from "../actions/importActions";

class Paginator extends Component {
  componentDidMount() {
    const userId = this.props.auth.user._id;
    this.props.getLabels(userId);
    this.props.getBudgets(userId);
    this.props.getMatches(userId);
    this.props.getDebits(this.props.auth.user._id);
  }

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
  error: state.error,
  match: state.match,
  import: state.import,
});

export default connect(mapStateToProps, { getLabels, getBudgets, getMatches, getDebits})(Paginator);
