import React from "react";
import MainHeader from "./MainHeader";
import { Link, Outlet } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={() => setDrawerIsOpen(false)} />}

      <SideDrawer show={drawerIsOpen} onClick={() => setDrawerIsOpen(false)}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerIsOpen(true)}
        >
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
