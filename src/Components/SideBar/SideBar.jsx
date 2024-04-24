// SideBar.jsx
import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import logoutIcon from '/log-out.svg';

function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/enseignants'>Enseignants</Link></li>
        <li><Link to='/calendar'>Calendar</Link></li>
        <li><Link to='/etats'>Etats</Link></li>
        <li><Link to='/claims'>Claims</Link></li>
        <li><Link to='/archive'>Archive</Link></li>
        <li><Link to='/trash'>Trash</Link></li>
      </ul>
      <div className="logout-btn">
        <img src={logoutIcon} alt="Log Out" className="logout-icon" />
        log out
      </div>
    </div>
  );
};

export default SideBar;
