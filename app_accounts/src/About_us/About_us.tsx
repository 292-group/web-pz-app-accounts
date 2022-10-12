import './About_us.css'
import db from '../db/db.accounts.json'
import React from 'react';
function AboutUs() {
  //I add all text to new element arr db.accounts
  return (
    <div className="about-us">
   <ul>
    <li><a className='a' href="#1">Angular vs React</a></li>
    <li><a className='a' href="#2">React vs Vue</a></li>
    <li><a className='a' href="#3">Angular vs Vue</a></li>
   </ul>
   <div className="info">
    <p id='1'><span className='span-header'>Angular vs React</span> {db["frameworks"][0].Angular_vs_React}</p>
    <p id='2'> <span  className='span-header'>React vs Vue</span> {db["frameworks"][0].React_vs_Vue} </p>
    <p id='3'> <span  className='span-header'>Angular vs Vue</span> {db["frameworks"][0].Angular_vs_Vue}</p>
   </div>
    </div>
  );
}

export default AboutUs;