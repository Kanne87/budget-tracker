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
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { addBudget, editBudget } from "../actions/budgetActions";
import CurrencyInput from "react-currency-input-field";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";

class BudgetModal extends Component {
  componentDidMount = () => {
    this.setEdit();
  };

  state = {
    id: this.props.editId,
    modal: false,
    name: "",
    budget_amount: 0,
    budget_intervall: "Monat",
    budget_submit: this.props.mode,
    budget_start: format(new Date(), "yyyy-MM-dd"),
    budget_end: "",
    checkEnd: false,
  };

  setEdit = () => {
    if (this.state.budget_submit === "edit") {
      const { budgets } = this.props.budget;
      const budgetEditArray = budgets.filter((budget) => {
        return budget._id === this.props.editId;
      });
      const budgetEdit = budgetEditArray[0];
      this.setState({
        name: budgetEdit.name,
        budget_amount: budgetEdit.budget_amount / 100,
        budget_intervall: budgetEdit.budget_intervall,
        budget_start: budgetEdit.budget_start.substr(0, 10),
        budget_end:
          budgetEdit.budget_end !== null
            ? budgetEdit.budget_end.substr(0, 10)
            : null,
      });
    }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      checkEnd: false,
    });
  };

  toggleEnd = () => {
    this.setState({
      checkEnd: !this.state.checkEnd,
    });
  };

  onChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.budget_submit === "add") {
      const newBudget = {
        name: this.state.name,
        budget_amount: parseFloat(
          this.state.budget_amount.replace(/,/g, ".")
        ).toFixed(2),
        budget_intervall: this.state.budget_intervall,
        budget_submit: this.state.budget_submit,
        budget_start: this.state.budget_start,
        budget_end: this.state.budget_end,
      };
      this.props.addBudget(newBudget);
    }
    if (this.state.budget_submit === "edit") {
      const editBudget = {
        _id: this.state.id,
        name: this.state.name,
        budget_amount: parseFloat(this.state.budget_amount.replace(/,/g, "."))
        .toFixed(2) * 100,
        budget_intervall: this.state.budget_intervall,
        budget_submit: this.state.budget_submit,
        budget_start: this.state.budget_start,
        budget_end: this.state.budget_end,
      };
      this.props.editBudget(editBudget);
    }
    //Add item via addItem

    this.toggle();
  };

  render() {
    return (
      <>
        {this.state.budget_submit === "add" ? (
          <Button
            className="deleteButton"
            style={{ marginTop: "1rem" }}
            color="dark"
            onClick={this.toggle}
          >
            Hinzufügen
          </Button>
        ) : (
          <FaEdit
            className="deleteButton"
            size={20}
            onClick={this.toggle}
          ></FaEdit>
        )}

        <Modal
          className="addModal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.budget_submit === "add"
              ? "Budget hinzufügen"
              : ["Budget ID ", this.state.id, " bearbeiten"]}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="budget">Beschreibung</Label>
                <Input
                  type="text"
                  name="name"
                  id="budget"
                  defaultValue={this.state.name}
                  placeholder="BEschreibung eingeben"
                  onChange={this.onChange}
                />
                <Row>
                  <Col className="bg-light " xs="6">
                    <Label for="budget_amount">Betrag</Label>
                    <InputGroup>
                      <InputGroupText>€</InputGroupText>
                      <CurrencyInput
                        className="currencyInput"
                        decimalScale={2}
                        defaultValue={0}
                        currency="true"
                        groupSeparator="."
                        placeholder="Betrag eingeben"
                        name="budget_amount"
                        id="budget_amount"
                        defaultValue={this.state.budget_amount}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col className="bg-light " xs="6">
                    <Label for="exampleSelect">Zahlungsintervall</Label>
                    <Input
                      id="budget_intervall"
                      name="budget_intervall"
                      type="select"
                      defaultValue={this.state.budget_intervall}
                      onChange={this.onChange}
                    >
                      <option>Monat</option>
                      <option>Quartal</option>
                      <option>Halbjahr</option>
                      <option>Jahr</option>
                    </Input>
                  </Col>
                </Row>
                <Row>
                  <Col className="bg-light " xs="6">
                    <Label for="budget_start">Beginn</Label>

                    <InputGroup>
                      <Input
                        type="date"
                        name="budget_start"
                        id="budget_start"
                        defaultValue={this.state.budget_start}
                        onChange={this.onChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col className="bg-light " xs="6">
                    <Label for="budget_start">
                      Ende <font size="2">(Standard: Kein Ende)</font>
                    </Label>

                    <InputGroup>
                      <InputGroupText>
                        <Input
                          addon
                          aria-label="Checkbox for following text input"
                          type="checkbox"
                          onChange={this.toggleEnd}
                          checked={this.state.checkEnd}
                        />
                      </InputGroupText>
                      <Input
                        type="date"
                        name="budget_end"
                        id="budget_end"
                        onChange={this.onChange}
                        placeholder="Check it out"
                        defaultValue={this.state.budget_end}
                        disabled={this.state.checkEnd === false ? true : false}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  {this.state.budget_submit === "add" ? "Hinzufügen" : "Ändern"}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budget,
});

export default connect(mapStateToProps, { addBudget, editBudget })(BudgetModal);
