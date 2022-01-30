import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import { getLabels, deleteLabel, editBudget } from "../../actions/labelActions";
import { colors } from "../../actions/constants";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaEdit } from "react-icons/fa";
import LabelEditModal from "./LabelEditModal";


class LabelList extends Component {
  componentDidMount() {
    const userId = this.props.auth.user._id;
    this.props.getLabels(userId);
  }

  onDeleteClick = (id) => {
    this.props.deleteLabel(id);
  };

  getColorName = (id) => {
    const result = colors.find((color) => color.id === id.label_color);
    return result.colorName;
  };
  getColorHex = (id) => {
    const result = colors.find((color) => color.id === id.label_color);
    return result.hex;
  };

  onEditClick = (id) => {
    console.log(id);
    
  };

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
              <td>
                <DeleteIcon
                  onClick={this.onDeleteClick.bind(this, _id)}
                  className="deleteButton"
                />{" "}
                <LabelEditModal editId={_id} editName={label_name} editColor={label_color} />
              </td>
              <td>{label_name}</td>
              <td>
                <div
                  className="labelColor"
                  style={{
                    backgroundColor: `#${this.getColorHex({ label_color })}`,
                  }}
                ></div>
                &nbsp;{this.getColorName({ label_color })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

LabelList.propTypes = {
  getLabels: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  label: state.label,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getLabels,
  deleteLabel,
})(LabelList);
