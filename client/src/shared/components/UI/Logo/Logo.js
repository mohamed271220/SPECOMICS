import React from "react";

import "./Logo.css";

const Logo = (props) => {
  return (
    <h1 className="logo center">
      SPEC<span className={props.isLogin ? "gray" : "white"}>OMIC</span>
    </h1>
  );
};

export default Logo;