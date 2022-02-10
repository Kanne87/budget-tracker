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
} from "reactstrap";
import { connect } from "react-redux";
import { addBudget, editBudget } from "../actions/budgetActions";
import { showMatchModal, hideMatchModal } from "../actions/modalActions";
import { editDebit } from "../actions/importActions";


class MatchModal extends Component {
   constructor(props) {
     super(props)
     this.state = {
       show: false,
      id: "",
    }; 

   }




  toggle = () => {


    
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.toggle();
  }

  render() {

    const userId = this.props.auth.user._id;
    return (
      <>
          <Button className="addButton shadow" onClick={this.props.showMatchModal} block>
            Zahlungen zuweisen
          </Button>

        <Modal
          className="addModal"
          isOpen={this.props.modal.matchModal}
          toggle={this.props.hideMatchModal}
        >
          <ModalHeader toggle={this.props.hideMatchModal}>
            Budget hinzufügen
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

              <Button color="dark" style={{ marginTop: "2rem" }} block>
                
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
  match: state.match,
  modal: state.modal,
});

export default connect(mapStateToProps, { addBudget, editBudget, editDebit, showMatchModal, hideMatchModal })(
  MatchModal
);
