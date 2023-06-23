import React, { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import Logo from "../UI/Logo/Logo";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
import Button from "../FormElements/Button/Button";
import { AuthContext } from "../../context/auth-context";
const Logout = (props) => {
  const auth = useContext(AuthContext);
  return (
    <>
      <Modal
        show={props.modalIsOpen}
        onCancel={() => props.setModalIsOpen(false)}
        header={<Logo isLogin={true} />}
      >
        <div>
          <img src="" alt="" />
          <Button onClick={() => props.setModalIsOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              auth.logout()
              props.setModalIsOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Logout;
