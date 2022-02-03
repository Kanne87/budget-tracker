import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { importItems } from "../importActions";
import ImportList from "../../components/ImportList";
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

class Uploader extends Component {
  state = {
    csvFile: null,
    vscArray: "",
  };

  onChange(data) {
    this.setState(
      {
        csvFile: data,
      }
    );
  }

  showList = () => {
    <ImportList />
  }

  submit = () => {
    this.props.importItems(this.state.csvFile);
  };

  render() {
    const { isImported } = this.props.import;
    return (
      <Fragment>
      <form id="">
        <input
          type="file"
          accept=".csv"
          id="csvFile"
          onChange={(e) => {
            this.onChange(e.target.files[0]);
          }}
        ></input>
        <br />
        <Button
        className="addButton"
          onClick={(e) => {
            e.preventDefault();
            this.state.csvFile && this.submit();
          }}
        >
          Submit
        </Button>
        <br />
        <br />
      </form>
      {isImported && <ImportList />}
      
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  import: state.import,
});

export default connect(mapStateToProps, { importItems })(Uploader);
