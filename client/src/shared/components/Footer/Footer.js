import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillGithub,
} from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  return (
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
  );
};

export default Footer;
