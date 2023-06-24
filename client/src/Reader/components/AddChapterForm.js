import React, { useContext } from "react";
import Button from "../../shared/components/FormElements/Button/Button";

import ImageUpload from "../../shared/components/ImageUpload/ImageUpload";

import Input from "../../shared/components/FormElements/Input/Input";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import ChapterUpload from "../../shared/components/ImageUpload/ChapterUpload";
import { AuthContext } from "../../shared/context/auth-context";

import { useNavigate, useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/Error/ErrorModal";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
// import "./AddMangaForm.css";
import "./index.css";

const AddMangaForm = () => {
  const auth = useContext(AuthContext);
  const readId = useParams().readId;
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    chapterNumber: {
      value: '',
      isValid: false,
    },
    pagesURls: {
      value: [],
      isValid: false,
    },
  });

  const mangaSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("pagesURls", formState.inputs.pagesURls.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("chapterNumber", formState.inputs.chapterNumber.value);

      await sendRequest(
        `http://localhost:8080/manga/${readId}/addChapter`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
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
          id="chapterNumber"
          type="number"
          min="1"
          element="input"
          validators={[]}
          label="Chapter number"
          errorText="Please enter a valid chapter number "
          onInput={inputHandler}
        />
{/* <ImageUpload/> */}

        <ChapterUpload
          id="pagesURls"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="please provide an image"
        />

        <Button
        //   size={window.innerWidth < 400 ? "small" : "wide"}
          type="submit"
          disabled={!formState.isValid}
        >
          ADD Chapter
        </Button>
      </form>
    </>
  );
};

export default AddMangaForm;
