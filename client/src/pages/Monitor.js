import React, { Component, Fragment } from "react";
import Uploader from "../actions/import/Uploader";
import ImportList from "../components/import/ImportList";

import ImportChecker from "../components/import/ImportChecker";

import PaymentsIcon from "@mui/icons-material/Payments";
import { useSelector } from "react-redux";

function Monitor() {
  
  const { isImported } = useSelector((state) => state.import);
  return (
    <Fragment>
      <section>
        <header className="border">
          <div className="headerTitle">
            <PaymentsIcon fontSize="large" className="btnColor" /> Monitor
            <p className="subheader">Importiere Buchungen</p>
          </div>
          <div className="headerInput">
            <Uploader />
          </div>
        </header>
        <main className="border">
        {isImported && <ImportChecker />}

          
          {/* <AdminList /> */}
          </main>
      </section>
    </Fragment>
  );
}

export default Monitor;
