import React from "react";
import { useSelector } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";

export default function ImportList() {
  const { imports } = useSelector((state) => state.import);
  
  return (
    <div>
      
      <Table>
        <thead>
          <tr>
            {Object.keys(imports[0]).map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {imports.map((item) => (
            <tr>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
          <td>{Object.values}</td>
        </tbody>
      </Table>
    </div>
  );
}
