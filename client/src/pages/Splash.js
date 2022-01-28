import React from "react";
import { AiOutlineLogin } from 'react-icons/ai';
import login from '../images/splash_login.png';

function Splash() {
  return (
   <section>
     <main>
      <img src={login} alt="Login" className="splashImage"/></main>
    </section>
  );
}

export default Splash;
