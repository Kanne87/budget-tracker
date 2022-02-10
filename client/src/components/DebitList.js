import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { getDebits } from "../actions/importActions";
import { addMatch, getMatches } from "../actions/matchActions";
import { formatOutputDate, formatOutputAmount } from "../actions/formatter";
import { connect } from "react-redux";
import BudgetModal from "./BudgetModal";


import { useSelector } from "react-redux";
import { HiDocumentAdd } from "react-icons/hi";

class DebitList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      debits: this.props.import.debits,
      matches: this.props.match.matches,
      show: false,
    }
  }


  matchFound = (debit_id) => {
    const { matches } = this.state;
    var found = false;
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].debit_id == debit_id) {
        found = true;
        break;
      }
    }
    return found;
  };

  render() {
    const mapped = this.state.debits.sort((a, b) => {
      if (a.debit_date > b.debit_date) {
        return 1;
      }
      if (a.debit_date < b.debit_date) {
        return -1;
      }
      return 0;
    });

    return (
      <Table>
        <thead>
          <tr className="dataHeading">
            <th className="dataHeading">Aktion</th>
            <th className="dataHeading">Datum</th>
            <th className="dataHeading">Beschreibung</th>
            <th className="dataHeading">Herkunft</th>
            <th className="dataHeading">Typ</th>
            <th className="dataHeading">Betrag</th>
          </tr>
        </thead>
        <tbody>
          {mapped.map((debit) => (
            <tr
              className={this.matchFound(debit._id) ? "markedRow" : ""}
              key={debit._id}
            >
              <td className="dataGrid">
                {!this.matchFound(debit._id) && (
                  <BudgetModal mode="transfer" debit={debit} />
                )}
              </td>
              <td className="dataGrid">{formatOutputDate(debit.debit_date)}</td>
              <td className="dataGrid">{debit.debit_desc}</td>
              <td className="dataGrid">{debit.debit_source}</td>
              <td className="dataGrid">{debit.debit_type}</td>
              <td className="dataGrid">
                {formatOutputAmount(debit.debit_amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  import: state.import,
  match: state.match,
});

export default connect(mapStateToProps, { getDebits, addMatch, getMatches })(
  DebitList
);
