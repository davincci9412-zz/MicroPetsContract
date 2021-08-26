/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ ActivePage }) => {
  return (
    <header className="">
        <Link to="/home" className={ActivePage === 0 ? 'logo active' : 'logo'}>
            <img src="/img/logo.png" alt=""></img>
            <p>MICROPETS</p>
        </Link>
        <div className="header-link" id="header-link">
            <Link to="/shop" className={ActivePage === 0 ? 'active' : ''}>Shop</Link>
            <Link to="/inventory" className={ActivePage === 1 ? 'active' : ''}>Inventory</Link>
            <Link to="/marketplace" className={ActivePage === 2 ? 'active' : ''}>Marketplace</Link>
            <Link to="#" className="close-btn" id="close-btn">
                <img src="/img/close.png" alt=""></img>
            </Link>
        </div>
        <div className="hamburger" id="hamburger">
            <img src="/img/hamburger.png" alt=""></img>
        </div>
    </header>
  );
};

export default Menu;


