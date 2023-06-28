import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillGithub,
} from "react-icons/ai";
import "./Footer.css";
import LoadingSpinner from "../../Loading/LoadingSpinner/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../..//hooks/form-hook";
import Input from "../FormElements/Input/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../util/validators";
import Button from "../FormElements/Button/Button";
import ErrorModal from "../Error/ErrorModal";
const Footer = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      message: { value: "", isValid: false },
      contactNumber: { value: "", isValid: false },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/manga/msg/contactForm`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          message: formState.inputs.message.value,
          contactNumber: formState.inputs.contactNumber.value,
        }),
        {
          "Contact-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setFormData(
        {
          title: {
            value: "",
            isValid: false,
          },
          message: {
            value: "",
            isValid: false,
          },
          contactNumber: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    } catch (err) {
      console.log(err);
    }
  };
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {auth.token && (
        <form className="contact-form" onSubmit={submitHandler}>
          <h1>Leave a message</h1>
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            id="message"
            element="textarea"
            type="text"
            label="Message"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a  message."
            onInput={inputHandler}
          />
          <Input
            id="contactNumber"
            element="input"
            type="tel"
            label="Contact Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid contact number ."
            onInput={inputHandler}
          />
          <Button size="small" className='center' type="submit" disabled={!formState.isValid}>
            Send Message
          </Button>
        </form>
      )}
      <div className="footer">
        <div className="footer__socials">
          <h2>Support the creator</h2>
          <div className="footer__socials-icons">
            <Link to={`https://www.facebook.com/mohamed.magdy.5612/`}>
              <AiFillFacebook size={60} />
            </Link>
            <Link to={`https://www.linkedin.com/in/mohamed-ibrahim-51a88b252/`}>
              <AiFillLinkedin size={60} />
            </Link>
            <Link to={`https://twitter.com/MagdyHenidak`}>
              <AiFillTwitterSquare size={60} />
            </Link>
            <Link to={`https://github.com/mohamed271220`}>
              <AiFillGithub size={60} />
            </Link>
          </div>
        </div>
        <div className="footer__jikan">
          <h2>This site is powered by Jikan.moe</h2>
          <Link to={`https://jikan.moe/`}>
            <img
              className="footer__jikan-icon"
              src="https://jikan.moe/assets/images/logo/jikan.logo.png"
              alt="jikan icon"
            ></img>
          </Link>
        </div>
        <div className="footer__copyright"></div>
      </div>
    </>
  );
};

export default Footer;
