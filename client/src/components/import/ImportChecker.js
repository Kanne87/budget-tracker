import React, { Component } from "react";
import { connect } from "react-redux";
import { postDebits, getDebits } from "../../actions/importActions";
import { formatImportDate, formatImportAmount } from "../../actions/formatter";
import ImportList from "./ImportList";

export class ImportChecker extends Component {
  state = {
    imports: this.props.import.imports,
    debits: this.props.import.debits,
    rawImport: "",
  };

  checkIfImported(imp) {
    const debs = this.state.debits;
    const importDesc = debs.filter(
      (deb) => deb.debit_desc === imp.Verwendungszweck
    );
    const importDate = debs.filter(
      (deb) =>
        new Date(deb.debit_date).toJSON() ===
        formatImportDate(imp.Buchungstag).toJSON()
    );
    const importAmount = debs.filter(
      (deb) => deb.debit_amount = 0 ? deb.debit_amount === formatImportAmount(imp.Betrag) : false
    );
    if (importDesc.length !== 0 && importDate !== 0 && importAmount !== 0) {
      return true
    } else {
      return false
    }
  }

  bugtest() {
    const checkList = this.state.imports.filter((item) => (!this.checkIfImported(item) && item.Betrag !== undefined));
    console.log(checkList);
    console.log(this.state.imports);
  }

  upload() {
    const checkList = this.state.imports.filter((item) => (!this.checkIfImported(item) && item.Betrag !== undefined));
    const rawImport = checkList.map((items, index) => ({
      debit_date: formatImportDate(items.Buchungstag),
      debit_amount: items.Betrag && formatImportAmount(items.Betrag),
      debit_desc: items.Verwendungszweck,
      debit_type: items.Buchungstext,
      debit_sourceId: items["Glaeubiger ID"],
      debit_mandat: items.Mandatsreferenz,
      debit_source: items["Beguenstigter/Zahlungspflichtiger"],
      debit_account: items["Kontonummer/IBAN"],
      debit_bic: items["BIC (SWIFT-Code)"],
      debit_booked: items.Info,
      user_id: this.props.auth.user._id,
      debit_budget_id: "",
    }));
    this.props.postDebits(rawImport);
  }

  render() {
    return (
      <div>
        <button onClick={this.upload.bind(this)}>Upload</button>
        <button onClick={this.bugtest.bind(this)}>Bugtest</button>
        <ImportList />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  import: state.import,
  auth: state.auth,
});

export default connect(mapStateToProps, { postDebits })(
  ImportChecker
);
