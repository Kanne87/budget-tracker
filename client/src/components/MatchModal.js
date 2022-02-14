import React, { Component, Fragment } from "react";
import update from "react-addons-update";
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
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import { addBudget, editBudget } from "../actions/budgetActions";
import {
  setMatchModal,
  unsetMatchModal,
  unsetBudgetModal,
} from "../actions/modalActions";
import { addMatch } from "../actions/matchActions";
import { formatOutputDate, formatOutputAmount } from "../actions/formatter";
import { editDebit } from "../actions/importActions";

class MatchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
      debitId: this.props.debitId,
      debitToCompare: this.props.import.debits.find(
        (debit) => debit._id === this.props.debitId
      ),
      filter: "debit_source",
      filterText: "",
      filterHeader: "Source",
      results: [],
      rowsToMark: [],
    };
    this.onSubmitMatch = this.onSubmitMatch.bind(this);
  }
  componentDidMount = () => {
    this.showResults();
  };

  toggle = () => {
    this.props.toggleHandler();
    this.props.unsetMatchModal();
  };

  toggleFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  };

  onDropdownChange = (e) => {
    this.setState({ filterHeader: e.target.name, filter: e.target.value }, () =>
      this.showResults()
    );
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () =>
      this.showResults()
    );
  };

  onSubmitMatch = async (e) => {
    e.preventDefault();
    const debitsToAdd = this.state.results.filter(result => result.isMarked === true);
    const matchesToAdd = debitsToAdd.map(debit => {
      return {
        budget_id: this.props.modal.matchModalBudgetId,
      debit_id: debit._id,
      user_id: this.props.modal.matchModalId,
      }
    });
    await matchesToAdd.map(match => {
       this.props.addMatch(match);
    })
    console.log(matchesToAdd);
    const editBudget = {
      _id: this.props.modal.matchModalBudgetId,
      filter: this.state.filter,
      filterText: this.state.filterText,
    };
    this.props.editBudget(editBudget);
    this.toggle();
  };

  showResults = () => {
    const debits = this.props.import.debits.filter(
      (debit) => debit._id !== this.state.debitId
    );
    let result = {};
    if (this.state.filter == "debit_desc") {
      result = debits.filter((debit) =>
        debit[this.state.filter]
          .toLowerCase()
          .includes(this.state.filterText.toLowerCase())
      );
    } else {
      result = debits.filter(
        (debit) =>
          debit[this.state.filter] ===
          this.state.debitToCompare[this.state.filter]
      );
    }

    this.setState({
      results: result,
    });
  };

  markResult = async (e) => {
    const debitId = e.target.dataset.title;
    const results = this.state.results;
    /* console.log(results); */
    const resultIndex = results.findIndex((element) => element._id === debitId);
    const newResult = results[resultIndex];
    newResult.isMarked =
      newResult.isMarked === undefined ? true : !newResult.isMarked;
    const newResults = await update(results, {
      $splice: [[resultIndex, 1, newResult]],
    });

    /* const newResults = update(this.state.results, {resultIndex: {$push: {marked: true}}}); */
    this.setState(
      (prevState) => ({
        state: [...prevState.results, [newResults]],
      }),
      this.setState({
        rowsToMark: [...this.state.rowsToMark, newResult._id],
      })
    );
  };
  

  render() {
    const debitsFoundSource = this.props.import.debits.filter(
      (debit) => debit.debit_source === this.state.debitToCompare.debit_source
    );
    /*     console.log(debitsFoundSource); */

    return (
      <Fragment>
        <Modal
          className="addModal"
          isOpen={
            this.props.debitId === this.props.modal.matchModalId &&
            this.props.modal.matchModal
          }
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Ähnliche Buchungen</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmitMatch}>
              <div className="inputRow">
                <InputGroup>
                  <ButtonDropdown
                    name="filter"
                    toggle={this.toggleFilter}
                    isOpen={this.state.showFilter}
                  >
                    <DropdownToggle onChange={this.onChange} caret>
                      {this.state.filterHeader}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={this.onDropdownChange}
                        name="Source"
                        value="debit_source"
                      >
                        Source
                      </DropdownItem>
                      <DropdownItem
                        onClick={this.onDropdownChange}
                        name="Buchungstext"
                        value="debit_desc"
                      >
                        Buchungstext
                      </DropdownItem>

                      <DropdownItem
                        onClick={this.onDropdownChange}
                        name="Betrag"
                        value="debit_amount"
                      >
                        Betrag
                      </DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <Input
                    onChange={this.onChange}
                    name="filterText"
                    disabled={
                      this.state.filterHeader === "Buchungstext" ? false : true
                    }
                  />
                  
                </InputGroup>
              </div>
              <div className="matchResults">
              <Button onClick={this.onSubmitMatch} color="dark" style={{ marginTop: "2rem" }} block>
                Speichern
              </Button>
                <Table hover>
                  <thead>
                    <tr>
                      <th className="dataHeading">Datum</th>
                      <th className="dataHeading">Beschreibung</th>
                      <th className="dataHeading">Source</th>
                      <th className="dataHeading">Betrag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.results.map((result) => (
                      <tr
                        className={result.isMarked ? "markedRow" : ""}
                        key={result._id}
                        id={result._id}
                        onClick={this.markResult}
                      >
                        <td data-title={result._id} className="dataGrid">
                          {formatOutputDate(result.debit_date)}
                        </td>
                        <td data-title={result._id} className="dataGrid">
                          {result.debit_desc}
                        </td>

                        <td data-title={result._id} className="dataGrid">
                          {result.debit_source}
                        </td>
                        <td data-title={result._id} className="dataGrid">
                          {formatOutputAmount(result.debit_amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  budget: state.budget,
  auth: state.auth,
  label: state.label,
  import: state.import,
  match: state.match,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  addBudget,
  editBudget,
  editDebit,
  setMatchModal,
  unsetMatchModal,
  unsetBudgetModal,
  addMatch,
})(MatchModal);
