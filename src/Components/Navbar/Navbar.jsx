import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Nav = () => (
  <nav>
    <section>
      <aside>
        <NavLink style={{ margin: '5em' }} to="/" exact className="btn">
          LandingPage
        </NavLink>
        <NavLink to="/Dashboard" className="btn">
          Dashboard
        </NavLink>
      </aside>
    </section>
  </nav>
);

export default Nav;
