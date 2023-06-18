import React from "react";
import { NavLink } from "react-router-dom";

import AuthModal from "../Auth/AuthModal";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <>
      {props.isDrawerOpen && (
        <div
          className="auth-container__drawer"
          onClick={() => props.setModalIsOpen(true)}
        >
          <div className="auth-control__drawer">Login | Signup</div>
        </div>
      )}
      <ul className="nav-links">
        <li>
          <NavLink className="" to="/" >
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
