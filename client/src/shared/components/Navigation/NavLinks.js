import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthModal from "../Auth/AuthModal";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <>
      {props.isDrawerOpen && (
        <div
          className="auth-container__drawer"
          onClick={() => props.setModalIsOpen(true)}
        >
          {auth.isLoggedIn ? (
            <div className="auth-control__drawer">Logout</div>
          ) : (
            <div className="auth-control__drawer">Login | Signup</div>
          )}
        </div>
      )}
      <ul className="nav-links">
        <li>
          <NavLink className="" to="/">
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
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/favorites/${auth.userId}`}>Favorites</NavLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavLinks;
