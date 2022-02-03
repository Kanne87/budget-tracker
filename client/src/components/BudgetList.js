import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import { getBudgets, deleteBudget, editBudget } from "../actions/budgetActions";
import { getLabels, getLabelColor } from "../actions/labelActions";
import { colors } from "../actions/constants";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import BudgetModal from "./BudgetModal";
import { FaEdit } from "react-icons/fa";
import "../App.css";
import { calcCurrency } from "../actions/formatter";

class BudgetList extends Component {
  componentDidMount() {
    const userId = this.props.auth.user._id;
    this.props.getLabels(userId);
    this.props.getBudgets(userId);
  }

  onDeleteClick = (id) => {
    this.props.deleteBudget(id);
  };

  formatCurrency = (amount) => {
    return amount / 100;
  };

  getColorHex = (id) => {
    const { labels } = this.props.label;
    if (labels.find((label) => label._id === id) === undefined) {
      console.log("Label nicht gefunden");
      return "";
      
    } else {
      var colorId = {};
      if ((labels.length = 0)) {
        return (colorId = "");
      } else {
        const labelColor = colors.find(
          (color) => color.id === colorId.label_color
        );
        colorId = labels.find((label) => label._id === id);
        return colorId;
      }
    }
  };

  render() {
    const { budgets } = this.props.budget;
    const { labels } = this.props.label;
    return (
      <Table>
        <thead>
          <tr>
            <th>Aktion</th>
            <th>Beschreibung</th>
            <th>Intervall</th>
            <th className="currencyText">Betrag</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(
            ({ _id, name, budget_amount, budget_intervall, budget_label }) => (
              <tr key={_id}>
                <td scope="row" className="actionContainer">
                  <DeleteIcon
                    style={{ marginRight: "0.5rem" }}
                    onClick={this.onDeleteClick.bind(this, _id)}
                    className="actionIcon"
                  />
                  <BudgetModal mode="edit" editId={_id} key={_id} />
                </td>
                <td>
                  {getLabelColor(budget_label, labels) !== "" ? (
                    <div
                      className="labelColor"
                      style={{
                        backgroundColor: getLabelColor(budget_label, labels),
                      }}
                    ></div>
                  ) : (
                    ""
                  )}
                  &nbsp;{name}
                </td>
                <td>{budget_intervall}</td>
                <td className="currencyText">{calcCurrency(budget_amount)}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    );
  }
}

BudgetList.propTypes = {
  getBudgets: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  budget: state.budget,
  auth: state.auth,
  label: state.label,
});

export default connect(mapStateToProps, {
  getBudgets,
  deleteBudget,
  editBudget,
  getLabels,
})(BudgetList);
