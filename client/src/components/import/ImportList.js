import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";

export default function ImportList() {
  const { imports } = useSelector((state) => state.import);
  const {debits} = useSelector((state) => state.import);


  const newImports = imports.filter((value, index, self) => {
   return value.Verwendungszweck !== debits.map(debit => debit.debit_desc);
  })
 

  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th className="dataHeading">Actions</th>
            {Object.keys(imports[0]).map((item, index) => (
              <th className="dataHeading" key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {imports.map((item, index) => (
            <tr key={index}>
              <td className="dataGrid">Divers</td>
              {Object.values(item).map((val, index) => (
                <td className="dataGrid" key={index}>
                  {val && val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}
