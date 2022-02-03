import React, { Component, Fragment } from "react";
import Uploader from "../actions/import/Uploader";
import PaymentsIcon from "@mui/icons-material/Payments";

class Monitor extends Component {
  render() {
    return (
      <Fragment>
        <section>
          <header className="border">
          <PaymentsIcon fontSize="large" className="btnColor"/> Monitor
          <p className="subheader">Importiere Buchungen</p>

          </header>
          <main className="border">
            <Uploader />
          </main>
        </section>
      </Fragment>
    );
  }
}

export default Monitor;
