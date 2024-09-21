import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {


  return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/members">Member List</Link></li>
          <li><Link to="/member-actions">Member Actions</Link></li>
          <li><Link to="/corona-data">View All Corona Data</Link></li>
          <li><Link to="/corona-data-summary">Corona Data Summary</Link></li>
        </ul>
      </nav>
  );
};

export default NavBar;
