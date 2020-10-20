import React from "react";
import { Link } from "@reach/router";
import northcodersLogo from '../images/northcodersLogo.jpg'

const Header = () => {
  return (
    <header>
      <img className='headerLogo' src={northcodersLogo} alt='' />
      <Link to='/'><h1>Northcoders News</h1></Link>
    </header>
  );
};




export default Header;
