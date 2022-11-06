import React, {useState} from 'react';
import "./NavBar.css"
import {NavLink} from "react-router-dom";
import {ABOUT_ROUTE, ACCOUNTS_ROUTE} from "../../utils/consts";

const NavBar = () => {
  const handleAccountClick = event => {
    const account = document.querySelector('.accounts');
    const about = document.querySelector('.about');

    account.style.borderBottomStyle = 'solid';
    account.style.borderBottomWidth = '5px';
    account.style.borderBottomColor = '#d03520';

    about.style.border= 'none'
  };
  const handleAboutClick = event => {
    const account = document.querySelector('.accounts');
    const about = document.querySelector('.about');

    about.style.borderBottomStyle = 'solid';
    about.style.borderBottomWidth = '5px';
    about.style.borderBottomColor = '#d03520';

    account.style.border= 'none'
  };

  return (
    <div className={"navigation"}>
      {/*<button className={"main-page"}>WEB-DEV</button>*/}
      <NavLink to={ACCOUNTS_ROUTE} onClick={handleAccountClick} className={"main-page"}><p>WEB-DEV</p></NavLink>
      <NavLink to={ACCOUNTS_ROUTE} onClick={handleAccountClick} className={"accounts"}><p>Accounts</p></NavLink>
      <NavLink to={ABOUT_ROUTE} onClick={handleAboutClick} className={"about"}><p>About us</p></NavLink>
    </div>
  );
};

export default NavBar;
