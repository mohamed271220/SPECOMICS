import React, { useReducer, useCallback } from "react";

import Input from "../FormElements/Input/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import Button from "../FormElements/Button/Button";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

const SignupForm = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: "",
        invalid: false,
      },
      password: {
        value: "",
        invalid: false,
      },
    },
    isValid: false,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);
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
          validators={[VALIDATOR_MINLENGTH(), VALIDATOR_REQUIRE()]}
          errorText="Invalid password"
          element="input"
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label=" Confirm Password"
          placeholder="Please confirm your password"
          validators={[VALIDATOR_MINLENGTH(), VALIDATOR_REQUIRE()]}
          element="input"
          onInput={inputHandler}
        />
        <Button type="submit" size='wide' className="button" danger>
          Signup
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
