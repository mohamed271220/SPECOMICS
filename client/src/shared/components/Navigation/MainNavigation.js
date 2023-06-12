import React from "react";
import MainHeader from "./MainHeader";
import { Link, Outlet } from "react-router-dom";
import Logo from "../UI/Logo";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
const MainNavigation = () => {
  return (
    <>
      <MainHeader>
        <button className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">
            <Logo isLogin={false} />
          </Link>
        </h1>
      </MainHeader>
      <MainHeader className="secondary main-navigation__header-nav">
        <NavLinks />
      </MainHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainNavigation;
