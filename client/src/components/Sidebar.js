import React, { Component } from "react";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import PaymentsIcon from "@mui/icons-material/Payments";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { connect } from "react-redux";
import { switchPage } from "../actions/budgetActions";

class Sidebar extends Component {
state = {
  page: 1
};

switchPage = (e) => {
  this.props.switchPage(e.target.id);
  };

  render() {
    const pagenr = this.state.page;
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem" onClick={this.switchPage} id="Budget">
                <PaymentsIcon /> Budget
              </li>
              <li className="sidebarListItem" onClick={this.switchPage} id="Monitor">
                <ShowChartIcon /> Monitor
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budget,
});
export default connect(mapStateToProps,  { switchPage })(Sidebar);
