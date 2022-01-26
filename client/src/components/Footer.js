import React from "react";
import { FaReact } from "react-icons/fa";
import { SiMongodb, SiMaterialui, SiRedux, SiBootstrap } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="">
      <div className="footerContainer">
        <h5>Powered by:</h5>
        <FaReact size="1.5rem" /> React <br />
        <SiMongodb size="1.5rem" /> MongoDB <br />
        <SiMaterialui size="1.5rem" /> MaterialUI <br />
        <SiRedux size="1.5rem" /> Redux <br />
        <SiBootstrap size="1.5rem" /> Bootstrap <br />
      </div>
      <div className="footerContainer"> Kontakt<br />
      Impressum</div>
      <div className="footerContainer"> </div>
    </footer>
  );
}
