import React, { Component, Fragment } from "react";
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
import { editLabel } from "../../actions/labelActions";
import CurrencyInput from "react-currency-input-field";
import { format } from "date-fns";
import { replaceAmount } from "../../actions/formatter";
import { colors } from "../../actions/constants";
import { FaEdit } from "react-icons/fa";

class LabelEditModal extends Component {
  componentDidMount = () => {
    console.log(this.props.editColor);
  };

  state = {
    _id: this.props.editId,
    label_name: this.props.editName,
    label_color: this.props.editColor,
    userId: this.props.auth.user._id,
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  isChecked = (id) => {
    if (id === this.state.label_color) {
      return true;
    } else {
      return false;
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const editLabel = {
      _id: this.state._id,
      label_name: this.state.label_name,
      label_color: this.state.label_color,
      userId: this.state.userId,
    };

    this.props.editLabel(editLabel);

    //Add item via addItem

    this.toggle();
  };

  render() {
    const labelColor = this.state.label_color;
    return (
      <Fragment>
        <FaEdit onClick={this.toggle} />
        <Modal
          className="addModal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Label editieren</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="label_name">Beschreibung</Label>
                <Input
                  type="text"
                  name="label_name"
                  id="label_name"
                  defaultValue={this.state.label_name}
                  placeholder="Beschreibung eingeben"
                  onChange={this.onChange}
                />
                <Label for="colors">Farben</Label>
                {colors.map(({ id, colorName, hex }) => (
                  <div className="radioContainer" key={id}>
                    <Input
                      name="label_color"
                      type="radio"
                      id="label_color"
                      onChange={this.onChange}
                      value={id}
                      checked={this.isChecked(id)}
                    />
                    &nbsp;&nbsp;
                    <Label check>
                      <div
                        className="radioColor"
                        style={{ backgroundColor: `#${hex}` }}
                      ></div>
                      &nbsp; {colorName}{" "}
                    </Label>
                  </div>
                ))}
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Speichern
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.label,
  auth: state.auth,
});

export default connect(mapStateToProps, { editLabel })(LabelEditModal);
