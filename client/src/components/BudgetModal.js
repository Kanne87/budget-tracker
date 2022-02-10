import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import Paper from "@mui/material/Paper";
import MatchModal from "./MatchModal";
import { experimentalStyled as styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { addBudget, editBudget } from "../actions/budgetActions";
import { editDebit } from "../actions/importActions";
import { addMatch } from "../actions/matchActions";
import { showBudgetDebitModal, hideBudgetDebitModal, showBudgetModal, hideBudgetModal } from "../actions/modalActions";
import { showMatchModal } from "../actions/modalActions";
import CurrencyInput from "react-currency-input-field";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";

class BudgetModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      
      modal: false,
      name: "",
      budget_amount: "",
      budget_intervall: "Monat",
      budget_submit: this.props.mode,
      budget_start: format(new Date(), "yyyy-MM-dd"),
      budget_end: "",
      budget_label: "",
      userId: "",
      checkEnd: false,
    };
  }

  componentDidMount = () => {
    this.props.mode === "edit" && this.setEdit();
    this.props.mode === "transfer" && this.setTransfer();

  };

  setTransfer = () => {
    const debit = this.props.debit;
    this.setState({
      name: debit.debit_source,
      budget_amount: (debit.debit_amount / 100) * -1,
      budget_intervall: this.state.budget_intervall,
      budget_submit: this.state.budget_submit,
      budget_start: this.state.budget_start,
      budget_end: this.state.budget_end,
      budget_label: this.state.budget_label,
      userId: this.props.auth.user._id,
      showId: this.props.modal,
      debit: {
        _id: this.props.debit._id,
      },
      
    });
  };

  setEdit = () => {
    const { budgets } = this.props.budget;
    const budgetEditArray = budgets.filter((budget) => {
      return budget._id === this.props.editId;
    });
    const budgetEdit = budgetEditArray[0];
    const amountText = budgetEdit.budget_amount / 100;
    const amount = "" + amountText;
    this.setState({
      id: this.props.editId,
      name: budgetEdit.name,
      budget_amount: amount,
      budget_intervall: budgetEdit.budget_intervall,
      budget_edit: budgetEdit.budget_submit,
      budget_start: budgetEdit.budget_start.substr(0, 10),
      budget_end:
        budgetEdit.budget_end !== null
          ? budgetEdit.budget_end.substr(0, 10)
          : null,
      budget_label: budgetEdit.budget_label,
      userId: budgetEdit.userId,
    });
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

  onSubmit = async (e) => {
    e.preventDefault();
    const userId = this.props.auth.user._id;
    if (this.state.budget_submit === "add") {
      const amountFixed = this.state.budget_amount;
      const newBudget = {
        name: this.state.name,
        budget_amount: parseFloat(amountFixed.replace(/,/g, ".")).toFixed(2),
        budget_intervall: this.state.budget_intervall,
        budget_submit: this.state.budget_submit,
        budget_start: this.state.budget_start,
        budget_end: this.state.budget_end,
        budget_label: this.state.budget_label,
        userId: userId,
      };
      this.props.addBudget(newBudget);
    }
    if (this.state.budget_submit === "edit") {
      const amountFixed = this.state.budget_amount;
      const editBudget = {
        _id: this.state.id,
        name: this.state.name,
        budget_amount: this.state.budget_amount.replace(/,/g, ".") * 100,
        budget_intervall: this.state.budget_intervall,
        budget_submit: this.state.budget_submit,
        budget_start: this.state.budget_start,
        budget_end: this.state.budget_end,
        budget_label: this.state.budget_label,
        userId: userId,
      };
      this.props.editBudget(editBudget);
    }
    if (this.state.budget_submit === "transfer") {
      const amountFixed = this.state.budget_amount;
      const debit = this.props.debit;
      const newBudget = {
        name: this.state.name,
        budget_amount: this.state.budget_amount * 100,
        budget_intervall: this.state.budget_intervall,
        budget_submit: this.state.budget_submit,
        budget_start: this.state.budget_start,
        budget_end: this.state.budget_end,
        budget_label: this.state.budget_label,
        userId: userId,
      };
      await this.props.addBudget(newBudget);
      console.log(this.props.budget.budgetToUpdate._id);
      const newMatch = {
        budget_id: this.props.budget.budgetToUpdate._id,
        debit_id: this.state.debit._id,
        user_id: userId,
      };
      console.log(newMatch);
      await this.props.addMatch(newMatch);
    }
    //Add item via addItem
    /* this.toggle(); */
    var method = this.props.showMatchModal;
    method();
    
  };

  render() {
    const { labels } = this.props.label;
    const userId = this.props.auth.user._id;
    return (
      <>
        {this.state.budget_submit === "add" && (
          <Button className="addButton shadow" onClick={this.props.showBudgetModal}>
            Hinzufügen
          </Button>
        )}
        {this.state.budget_submit === "edit" && (
          <FaEdit
            className="deleteButton"
            size={20}
            onClick={this.toggle}
          ></FaEdit>
        )}
        {this.state.budget_submit === "transfer" && (
          <Button className="deleteButton" id={this.props.debit._id} onClick={this.props.showBudgetDebitModal}>
            +
          </Button>
        )}
        <Modal
          className="addModal"
          isOpen={this.state.budget_submit === "transfer" ? this.props.debit._id === this.props.modal.budgetModalDebitId : this.props.modal.budgetModal}
          toggle={this.props.hideBudgetDebitModal}
        >
          <ModalHeader toggle={this.props.hideBudgetDebitModal}>
            {this.state.budget_submit === "edit"
              ? ["Budget ID ", this.state.id, " bearbeiten"]
              : "Budget hinzufügen"}
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <div className="inputRow">
                <Label for="budget">Beschreibung</Label>
                <Input
                  className="inputModal"
                  type="text"
                  name="name"
                  id="budget"
                  defaultValue={this.state.name}
                  placeholder="Beschreibung eingeben"
                  onChange={this.onChange}
                />
              </div>
              <Label for="budget_amount">Betrag</Label>
              <div className="inputRow">
                <InputGroup>
                  <InputGroupText>€</InputGroupText>
                  <CurrencyInput
                    className="currencyInput"
                    decimalScale={2}
                    currency="true"
                    groupSeparator="."
                    placeholder="Betrag eingeben"
                    name="budget_amount"
                    id="budget_amount"
                    defaultValue={this.state.budget_amount}
                    onChange={this.onChange}
                  />
                </InputGroup>
              </div>
              <div className="inputRow">
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
              </div>
              <div className="inputRow">
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
              </div>
              <div className="inputRow">
                <Label for="budget_start">
                  Ende <font className="annotation">(Standard: Kein Ende)</font>
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
              </div>
              <div className="inputRow">
                <Label for="labels">Label</Label>

                {labels.map(({ _id, label_name }) => (
                  <div key={_id}>
                    <Input
                      name="budget_label"
                      type="radio"
                      id="budget_label"
                      onChange={this.onChange}
                      value={_id}
                      checked={this.state.budget_label === _id ? true : false}
                    />
                    <Label check>&nbsp;{label_name}</Label>
                  </div>
                ))}
              </div>
              <MatchModal />
              <Button onClick={this.props.showBudgetDebitModal} color="dark" style={{ marginTop: "0.4rem" }} block>
                {this.state.budget_submit === "edit" ? "Ändern" : "Hinzufügen"}
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budget,
  auth: state.auth,
  label: state.label,
  import: state.import,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  addBudget,
  editBudget,
  editDebit,
  addMatch,
  showMatchModal,
  showBudgetModal,
  hideBudgetModal,
  showBudgetDebitModal,
  hideBudgetDebitModal,
})(BudgetModal);
