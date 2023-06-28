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
import { useHttpClient } from "../../hooks/http-hook";

const SignupForm = (props) => {
  const auth = useContext(AuthContext);
  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(undefined);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // console.log(error);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        invalid: false,
      },
      password: {
        value: "",
        invalid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signupSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        "POST",

        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          name: formState.inputs.name.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(data.userId, data.token);

      props.onCancel();
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="form" onSubmit={signupSubmitHandler}>
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
          id="name"
          type="name"
          label=" Name"
          placeholder="Please enter your name"
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          onInput={inputHandler}
        />
        <Button
          disabled={!formState.isValid}
          type="submit"
          size="small"
          className="center button"
          
          danger
          onClick={signupSubmitHandler}
        >
          Signup
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
