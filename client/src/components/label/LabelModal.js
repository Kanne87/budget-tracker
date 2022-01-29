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
import { addLabel } from "../../actions/labelActions";
import CurrencyInput from "react-currency-input-field";
import { format } from "date-fns";
import { replaceAmount } from "../../actions/formatter";
import { colors } from "../../actions/constants";
import { FaEdit } from "react-icons/fa";

class LabelModal extends Component {
  componentDidMount = () => {
    colors.forEach((label_name) => {
      console.log( label_name);
    })
    
  
    
  };

  state = {
    id: "",
    label_name: "",
    userId: "",
    label_color: "Blau",
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userId = this.props.auth.user._id;
    const newLabel = {
      label_name: this.state.label_name,
      label_color: this.state.label_color,
      userId: userId,
    };

    this.props.addLabel(newLabel);

    //Add item via addItem

    this.toggle();
  };

  render() {
    return (
      <>
        <Button className="addButton" onClick={this.toggle}>
          Hinzufügen
        </Button>

        <Modal
          className="addModal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Label hinzufügen</ModalHeader>
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
                  {colors.map(
                    ({
                      id, 
                      colorName, 
                      hex
                    }) => (
                      <div className="radioContainer">
                        
                        <Input
                        name="label_color"
                        type="radio"
                        id="label_color"
                        onChange={this.onChange}
                        value={id}
                         />&nbsp;&nbsp;
                         <Label check><div className="radioColor" style={{backgroundColor: `#${hex}`}}></div>&nbsp; {colorName} </Label>
                      </div>
                    
                  ))}
                  {/* <option>Blau</option>
                  <option>Rot</option>
                  <option>Geld</option>
                  <option>Grün</option> */}
                
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Hinzufügen
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
  auth: state.auth,
});

export default connect(mapStateToProps, { addLabel })(LabelModal);
