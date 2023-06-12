import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <>

        <ul className="NavLinks">
          <li>
            <NavLink className="" to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/">News</NavLink>
          </li>
          <li>
            <NavLink to="/">Discover</NavLink>
          </li>
          <li>
            <NavLink to="/">Read</NavLink>
          </li>
        </ul>
    
    </>
  );
};

export default NavLinks;
