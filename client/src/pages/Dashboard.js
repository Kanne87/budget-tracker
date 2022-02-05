import React, { Component, Fragment } from "react";
import AdminList from "../components/AdminList";


import PaymentsIcon from "@mui/icons-material/Payments";
import { useSelector } from "react-redux";

function Dashboard() {
  
  const { isImported } = useSelector((state) => state.import);
  return (
    <Fragment>
      <section>
        <header className="border">
          <div className="headerTitle">
            <PaymentsIcon fontSize="large" className="btnColor" /> Dashboard
            <p className="subheader">Erstelle Budgets aus Imports</p>
          </div>
          <div className="headerInput">
            
          </div>
        </header>
        <main className="border">
       

          
          <AdminList />
          </main>
      </section>
    </Fragment>
  );
}

export default Dashboard;
