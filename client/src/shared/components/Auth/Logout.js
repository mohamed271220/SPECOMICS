import React, { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import Logo from "../UI/Logo/Logo";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
import Button from "../FormElements/Button/Button";
import { AuthContext } from "../../context/auth-context";
import LogoutPng from "../../assets/Logout.png";
import './Form.css'
const Logout = (props) => {
  const auth = useContext(AuthContext);
  return (
    <>
      <Modal
        show={props.modalIsOpen}
        onCancel={() => props.setModalIsOpen(false)}
        header={<Logo isLogin={true} />}
      >
        <div const className="logout-container">
        <h1>YOU LEAVING ALREADY ?</h1>
          <img src={LogoutPng} alt="chooper" />
          <div className="logout-control">
            <Button inverse  onClick={() => props.setModalIsOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                auth.logout();
                props.setModalIsOpen(false);
              }}
              danger
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Logout;
