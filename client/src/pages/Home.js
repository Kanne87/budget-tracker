import React from "react";
import BudgetList from "../components/BudgetList";
import BudgetModal from "../components/BudgetModal";
import PaymentsIcon from "@mui/icons-material/Payments";

function Home() {
  return (
    <div className="home ">
      <h2 class="ui header ">
        <BudgetModal mode="add" />
        <PaymentsIcon fontSize="large" /> Budgets
        <div class="sub vontent">Verwalte das Budget</div>
      </h2>

      <div className="ui">
        <BudgetList key="2" />
      </div>
    </div>
  );
}

export default Home;
