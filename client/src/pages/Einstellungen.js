import React from "react";
import { FiSettings } from "react-icons/fi";
import LabelModal from "../components/label/LabelModal";
import LabelList from "../components/label/LabelList";

export default function Einstellungen() {
  return (
    <section className="einstellungen">
      <header className="headerWrapper border">
        <div className="headerTitle">
          <FiSettings size="2rem" className="btnColor" /> Labels
          <p className="subheader">Labels bearbeiten</p>
        </div>
        <div >
          <LabelModal />
        </div>
      </header>

      <main className="border">
        <LabelList />
      </main>
    </section>
  );
}
