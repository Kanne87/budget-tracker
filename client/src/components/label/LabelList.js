import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import {
  getLabels,
  deleteBudget,
  editBudget,
} from "../../actions/labelActions";
import { colors } from "../../actions/constants";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaEdit } from "react-icons/fa";

class LabelList extends Component {
  componentDidMount() {
    const userId = this.props.auth.user._id;
    this.props.getLabels(userId);
  }

  onDeleteClick = (id) => {
    this.props.deleteBudget(id);
  };

  onEditClick = (id) => {};

  render() {
    const { labels } = this.props.label;
    return (
      <Table>
        <thead>
          <tr>
            <th>Aktion</th>
            <th>Beschreibung</th>
            <th>Farbe</th>
          </tr>
        </thead>
        <tbody>
          {labels.map(({ _id, label_name, label_color }) => (
            <tr key={_id}>
              <td><DeleteIcon /> <FaEdit /></td>
              <td>{label_name}</td>
              <td>{label_color}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

LabelList.propTypes = {
  getLabels: PropTypes.func.isRequired,
  labels: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  label: state.label,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getLabels,
})(LabelList);
