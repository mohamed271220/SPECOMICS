import React from "react";
import MainHeader from "./MainHeader";
import { Link, Outlet } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import AuthModal from "../Auth/AuthModal";
import "./MainNavigation.css";
const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={() => setDrawerIsOpen(false)} />}
      {/* {modalIsOpen && <Backdrop onClick={() => setDrawerIsOpen(false)} />} */}

      <SideDrawer show={drawerIsOpen} onClick={() => setDrawerIsOpen(false)}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks setModalIsOpen={setModalIsOpen} isDrawerOpen />
        </nav>
      </SideDrawer>

      <AuthModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerIsOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="auth-container" onClick={() => setModalIsOpen(true)}>
          <div className="auth-control">Login | Signup</div>
        </div>

        <h1 className="main-navigation__title">
          <Link to="/">
            <Logo isLogin={false} />
          </Link>
        </h1>
      </MainHeader>
      <MainHeader className="secondary main-navigation__header-nav">
        <NavLinks />
      </MainHeader>

    
    </>
  );
};

export default MainNavigation;
