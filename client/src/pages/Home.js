import React, { Fragment } from "react";
import BudgetList from "../components/BudgetList";
import BudgetModal from "../components/BudgetModal";
import PaymentsIcon from "@mui/icons-material/Payments";

function Home() {
  return (
    <Fragment>
      <section>
        <header className="border">
          <BudgetModal mode="add" />
          <PaymentsIcon fontSize="large" className="btnColor"/> Budgets
          <p className="subheader">Verwalte das Budget</p>
        </header>
        <main className="border">
          <BudgetList key="2" />
        </main>
      </section>
    </Fragment>
  );
}

export default Home;
