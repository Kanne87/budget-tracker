import React from "react";
import BudgetList from "../components/BudgetList";
import BudgetModal from "../components/BudgetModal";

function Home() {
  return (
    <div className="home">
      <BudgetModal mode="add"/>
      <div className="budgetList">
        <BudgetList key="2"/>
      </div>
    </div>
  );
}

export default Home;
