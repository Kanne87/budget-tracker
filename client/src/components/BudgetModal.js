import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { connect } from "react-redux";
import { addBudget } from "../actions/budgetActions";

class BudgetModal extends Component {
  state = {
    modal: false,
    name: "",
    budget_amount: 0,
    budget_intervall: "Monat",
    budget_submit: "add",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("change");
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newBudget = {
      name: this.state.name,
      budget_amount: this.state.budget_amount,
      budget_intervall: this.state.budget_intervall,
      budget_submit: this.state.budget_submit,
    };
    //Add item via addItem
    newBudget.budget_submit === "add"
      ? this.props.addBudget(newBudget)
      : this.props.editBudget(newBudget);

    /* if (newBudget.budget_submit === 'add') {
         this.props.addBudget(newBudget);
      } else if (newBudget.budget_submit === 'edit') {
         this.props.editBudget(newBudget);
      }
       */
    // close Modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginTop: "1rem" }}
          onClick={this.toggle}
        >
          Add Budget
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {this.state.budget_submit === "add"
              ? "Budget hinzufügen"
              : "Budget ändern"}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="budget">Beschreibung</Label>
                <Input
                  type="text"
                  name="name"
                  id="budget"
                  placeholder="Beschreibung hinzufügen"
                  onChange={this.onChange}
                />
                <Label for="budget_amount">Betrag</Label>
                <InputGroup>
                  <InputGroupText>€</InputGroupText>
                  <Input
                    type="number"
                    placeholder="Betrag eingeben"
                    name="budget_amount"
                    id="budget_amount"
                    onChange={this.onChange}
                  />
                </InputGroup>
                <Label for="exampleSelect">Zahlungsintervall</Label>
                <Input
                  id="budget_intervall"
                  name="budget_intervall"
                  type="select"
                  onChange={this.onChange}
                >
                  <option>Monat</option>
                  <option>Quartal</option>
                  <option>Halbjahr</option>
                  <option>Jahr</option>
                </Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Budget
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budget,
});

export default connect(mapStateToProps, { addBudget })(BudgetModal);
