import React, { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import Logo from "../UI/Logo/Logo";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Logout from "./Logout";
const AuthModal = (props) => {
  const [isLoginForm, setIsLoginForm] = React.useState(true);

  const auth = useContext(AuthContext);

  const changeFormHandler = (ev) => {
    ev.preventDefault();

    setIsLoginForm((prevMode) => !prevMode);
  };

  if (auth.isLoggedIn) {
    return <Logout {...props} />;
  }

  return (
    <>
      <Modal
        show={props.modalIsOpen}
        onCancel={() => props.setModalIsOpen(false)}
        header={<Logo isLogin={true} />}
      >
        <div>
          {isLoginForm ? (
            <LoginForm onCancel={() => props.setModalIsOpen(false)} />
          ) : (
            <SignupForm onCancel={() => props.setModalIsOpen(false)} />
          )}
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
