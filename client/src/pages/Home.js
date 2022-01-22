import React from "react";
import BudgetList from "../components/BudgetList";
import BudgetModal from "../components/BudgetModal";
import PaymentsIcon from "@mui/icons-material/Payments";

function Home() {
  return (
    <section>
      <header className="header border">
        <BudgetModal mode="add" />
        <PaymentsIcon fontSize="large" /> Budgets
        <p className="subheader">Verwalte das Budget</p>
      </header>

      <article className="border">
        <BudgetList key="2" />
      </article>
      
    </section>
    
  );
}

export default Home;
