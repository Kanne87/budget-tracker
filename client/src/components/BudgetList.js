import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import { getBudgets, deleteBudget, editBudget } from "../actions/budgetActions";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import BudgetModal from "./BudgetModal";
import { FaEdit } from "react-icons/fa";
import "../App.css";
import calcCurrency from "../actions/formatter";

class BudgetList extends Component {
  componentDidMount() {
    this.props.getBudgets();
  }

  onDeleteClick = (id) => {
    this.props.deleteBudget(id);
  };

  formatCurrency = (amount) => {
    return amount / 100;
  };

  onEditClick = (id) => {};

  render() {
    const { budgets } = this.props.budget;
    return (
      <Container>
        <ListGroup>
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
                ({
                  _id,
                  name,
                  budget_amount,
                  budget_intervall,
                  budget_start,
                  budget_end,
                }) => (
                  <tr key={_id}>
                    <th scope="row">
                      <div className="topIconBadgeContainer">
                        <DeleteIcon
                          style={{ marginRight: "0.5rem" }}
                          onClick={this.onDeleteClick.bind(this, _id)}
                          className="deleteButton"
                        />
                        <BudgetModal mode="edit" editId={_id} key={_id} />
                        {/* <FaEdit
                        className="deleteButton"
                        size={20}
                        onClick={this.onEditClick.bind(this, _id)}
                      ></FaEdit> */}
                      </div>
                    </th>
                    <td>{name}</td>
                    <td>{budget_intervall}</td>
                    <td className="currencyText">
                      {calcCurrency(budget_amount / 100)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </ListGroup>
      </Container>
    );
  }
}

BudgetList.propTypes = {
  getBudgets: PropTypes.func.isRequired,
  budget: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  budget: state.budget,
});

export default connect(mapStateToProps, {
  getBudgets,
  deleteBudget,
  editBudget,
})(BudgetList);
