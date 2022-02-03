import React from "react";
import { FaReact } from "react-icons/fa";
import { SiMongodb, SiMaterialui, SiRedux, SiBootstrap } from "react-icons/si";

export default function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <h5>Powered by:</h5>
        <FaReact  /> React <br />
        <SiMongodb  /> MongoDB <br />
        <SiMaterialui  /> MaterialUI <br />
        <SiRedux  /> Redux <br />
        <SiBootstrap /> Bootstrap <br />
      </div>
      <div className="footerContainer"> Kontakt<br />
      Impressum</div>
    </footer>
  );
}
