import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = () => {
  return (
    <>
      <ul className="nav-links">
        <li>
          <NavLink className="" to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
        <li>
          <NavLink to="/read">Read</NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavLinks;
