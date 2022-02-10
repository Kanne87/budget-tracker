import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { importItems, getDebits } from "../importActions";
import ImportList from "../../components/import/ImportList";
import { Button, Input } from "reactstrap";

class Uploader extends Component {
  state = {
    csvFile: null,
    vscArray: "",
  };


  onChange(data) {
    this.setState({
      csvFile: data,
    });
  }

  submit = () => {
    this.props.importItems(this.state.csvFile);
  };

  render() {
    const { isImported } = this.props.import;
    return (
      <Fragment>
        <form id="csvFile" className="fileInput">
        <Button
            className="addButton"
            onClick={(e) => {
              e.preventDefault();
              this.state.csvFile && this.submit();
            }}
          >
            Submit
          </Button>
          <Input
          className="fileInput"
            type="file"
            accept=".csv"
            id="csvFile"
            onChange={(e) => {
              this.onChange(e.target.files[0]);
            }}
           />

          

        </form>
        {/* {isImported && <ImportList />} */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  import: state.import,
});

export default connect(mapStateToProps, { importItems, getDebits })(Uploader);
