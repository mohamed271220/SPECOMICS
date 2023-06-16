import React from "react";

import Input from "../FormElements/Input/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import Button from "../FormElements/Button/Button";
import { useForm } from "../../hooks/form-hook";

const SignupForm = () => {
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
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signupSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs.email.value);
    console.log(formState.inputs.password.value);
    console.log(formState.inputs.confirmPassword.value);
  };

  return (
    <>
      <form className="form">
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
        <Input
          id="password"
          type="password"
          label=" Confirm Password"
          placeholder="Please confirm your password"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_REQUIRE()]}
          element="input"
          onInput={inputHandler}
        />
        <Button
          disabled={!formState.isValid}
          type="submit"
          size="wide"
          className="button"
          danger
        >
          Signup
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
