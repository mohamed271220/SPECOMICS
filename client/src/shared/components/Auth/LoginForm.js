import React from "react";

import Input from "../FormElements/Input/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import Button from "../FormElements/Button/Button";
import { useForm } from "../../hooks/form-hook";

const LoginForm = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        invalid: false,
      },
      password: {
        value: "",
        invalid: false,
      },
    },
    false
  );

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs.email.value);
    console.log(formState.inputs.password.value);
  };

  return (
    <>
      <form className="form" onSubmit={loginSubmitHandler}>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          label="E-mail"
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email address."
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Make sure that your password is strong"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          errorText="Invalid password"
          element="input"
          onInput={inputHandler}
        />
        <Button
          type="submit"
          size="wide"
          className="button"
          danger
          disabled={!formState.isValid}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
