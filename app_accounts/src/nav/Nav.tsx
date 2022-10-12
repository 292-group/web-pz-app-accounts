import React from 'react';
import './Nav.css'

function Nav() {
  return (
    <div className="nav">
        <nav className='nav-menu'>
            <ul className='ul-menu'>
          <li><a  className='link web-22-link' href='/'>WEB 22</a></li>
          <li><a className='link'   href="/accounts">Acounts</a></li>
          <li><a className='link about-us-link' href="/about_us">About us</a></li>
          </ul>
        </nav>
       
    </div>
  );
}

export default Nav;