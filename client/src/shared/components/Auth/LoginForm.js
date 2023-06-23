import React, { useContext } from "react";

import Input from "../FormElements/Input/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../util/validators";
import Button from "../FormElements/Button/Button";
import { useForm } from "../../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import ErrorModal from "../Error/ErrorModal";
import LoadingSpinner from "../../Loading/LoadingSpinner/LoadingSpinner";

const LoginForm = (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(undefined);

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

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      auth.login(responseData.userId);
      props.onCancel()
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsError(err.message || "Something went wrong!");
    }

    console.log(formState.inputs.email.value);
    console.log(formState.inputs.password.value);
  };

  return (
    <>
      <ErrorModal error={isError} onClear={() => setIsError(null)} />
      {isLoading && <LoadingSpinner asOverlay />}
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
          onClick={loginSubmitHandler}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
