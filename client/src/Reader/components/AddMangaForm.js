import React from "react";
import Button from "../../shared/components/FormElements/Button/Button";

import ImageUpload from "../../shared/components/ImageUpload/ImageUpload";

import Input from "../../shared/components/FormElements/Input/Input";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { useNavigate } from "react-router-dom";

import  ErrorModal  from "../../shared/components/Error/ErrorModal";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
// import "./AddMangaForm.css";

const AddMangaForm = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    image: {
      value: null,
      isValid: false,
    },
    author: {
      value: "",
      isValid: false,
    },
  });


  const mangaSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("author", formState.inputs.author.value);
      await sendRequest("http://localhost:8080/manga/newManga", "POST", formData);
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <form className="manga-form" onSubmit={mangaSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="author"
          element="input"
          label="Author"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid author."
          onInput={inputHandler}
        />
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="please provide an image"
          isPfp
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD MANGA
        </Button>
      </form>
    </>
  );
};

export default AddMangaForm;
