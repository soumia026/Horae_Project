import React from "react";
import { useState } from "react";
import '../Styles/Navbar.css';
import { Link } from "react-router-dom";

export const NavBar = (props) =>{
    const [clickedItem, setClickedItem] = useState(0);

  const toggle = (index) =>{
    setClickedItem(index === clickedItem ? null : index);
  }



  return(
    <div className="nav-container">
        <div className="logo-container">
          <span>Logo</span>
        </div>
        <nav>
          <ul>
            {props.navItems.map((item,index) => (
              <li key={index}><Link to={`/${item.path}`} onClick={() => toggle(index)} className={`link ${index === clickedItem ? 'clicked' : null}`}>{item.name}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="logout-container">
          <button>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5308 2.21726L13.281 2.25848C13.6458 2.26394 13.9934 2.41407 14.2474 2.67582C14.5014 2.93757 14.641 3.28952 14.6356 3.65423L14.4913 13.2802C14.4858 13.6449 14.3357 13.9925 14.074 14.2465C13.8122 14.5006 13.4603 14.6402 13.0956 14.6347L10.3453 14.5935" stroke="black" stroke-opacity="0.3" stroke-width="1.37529" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5.67531 4.89543L2.18594 8.28175L5.57227 11.7711" stroke="black" stroke-opacity="0.3" stroke-width="1.37529" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M2.18667 8.28174L10.4375 8.4054" stroke="black" stroke-opacity="0.3" stroke-width="1.37529" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span> logout </span>
          </button>

        </div>
      </div>
  )
}