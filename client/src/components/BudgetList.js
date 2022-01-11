import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import { getBudgets, deleteBudget, editBudget } from "../actions/budgetActions";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";

class BudgetList extends Component {
  componentDidMount() {
    this.props.getBudgets();
  }

  onDeleteClick = (id) => {
    this.props.deleteBudget(id);
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
                <th>Betrag</th>
                <th>Intervall</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map(({ _id, name, budget_amount, budget_intervall }) => (
                <tr key={_id}>
                  <th scope="row">
                    <div className="topIconBadgeContainer">
                      <DeleteIcon
                        style={{ marginRight: "0.5rem" }}
                        onClick={this.onDeleteClick.bind(this, _id)}
                      />
                      
                    
                    <Button
                      classnames="remove-btn"
                      color="info"
                      size="sm"
                      onClick={this.onEditClick.bind(this, _id)}
                    >
                      &#xe019;
                    </Button>
                    </div>
                  </th>
                  <td>{name}</td>
                  <td>{budget_amount}</td>
                  <td>{budget_intervall}</td>
                </tr>
              ))}
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
