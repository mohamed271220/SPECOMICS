import React from "react";

import Modal from "../UI/Modal/Modal";
import Logo from "../UI/Logo/Logo";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
const AuthModal = (props) => {
  const [isLoginForm, setIsLoginForm] = React.useState(true);

 
  const changeFormHandler = (ev) => {
    ev.preventDefault();
   
    setIsLoginForm(!isLoginForm);
  };
  return (
    <>
      <Modal
        show={props.modalIsOpen}
        onCancel={() => props.setModalIsOpen(false)}
        header={<Logo isLogin={true} />}
      >
        <div>
          {isLoginForm ? <LoginForm /> : <SignupForm />}
          <Link onClick={changeFormHandler}>
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;
