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
import { addBudget } from "../actions/budgetActions";
import CurrencyInput from "react-currency-input-field";
import { format } from "date-fns";

class BudgetModal extends Component {
  state = {
    id: "",
    modal: false,
    name: "",
    budget_amount: 0,
    budget_intervall: "Monat",
    budget_submit: "add",
    budget_start: format(new Date(), "yyyy-MM-dd"),
    budget_end: "",
    checkEnd: false,
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
        <div className="addButton">
        <Button
          color="dark"
          
          onClick={this.toggle}
        >
          Add Budget
        </Button></div>
        <Modal
          className="addModal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
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
                        defaultValue={new Date().now}
                        name="budget_start"
                        id="budget_start"
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
                        disabled={this.state.checkEnd === false ? true : false}
                      />
                    </InputGroup>
                    {/* <Input
                      type="date"
                      placeholder="Startdatum eingeben"
                      name="budget_end"
                      id="budget_end"
                      placeholder="Enddatum"
                      onChange={this.onChange}
                    ></Input> */}
                  </Col>
                </Row>

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
