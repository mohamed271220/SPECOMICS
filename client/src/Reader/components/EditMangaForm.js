import React, { useContext, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button/Button";

import ImageUpload from "../../shared/components/ImageUpload/ImageUpload";

import Input from "../../shared/components/FormElements/Input/Input";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { AuthContext } from "../../shared/context/auth-context";

import { useNavigate, useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/Error/ErrorModal";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";
// import "./AddMangaForm.css";

const EditMangaForm = () => {
  const { readId } = useParams();
  const auth = useContext(AuthContext);
  const [loadedManga, setLoadedManga] = React.useState();

  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
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
    },
    false
  );

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/manga/${readId}`
        );
        console.log(responseData);
        setLoadedManga(responseData.manga);
        setFormData(
          {
            title: {
              value: responseData.manga.title,
              isValid: true,
            },
            description: {
              value: responseData.manga.description,
              isValid: true,
            },
            image: {
              value: responseData.manga.image,
              isValid: true,
            },
            author: {
              value: responseData.manga.author,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchManga();
  }, [sendRequest, readId, setFormData]);

  const mangaSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("author", formState.inputs.author.value);
      await sendRequest(
        `http://localhost:8080/manga/${readId}/edit`,
        "PUT",
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

      {!isLoading && loadedManga && (
        <form className="manga-form" onSubmit={mangaSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedManga.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedManga.description}
            initialValid={true}
            rows={5}
          />
          <Input
            id="author"
            element="input"
            label="Author"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid author."
            onInput={inputHandler}
            initialValue={loadedManga.author}
            initialValid={true}
          />
          <ImageUpload
            center
            id="image"
            onInput={inputHandler}
            errorText="please provide an image"
            isPfp
            initialValue={loadedManga.image}
            initialValid={true}
          />

          <Button
            danger
            size={"wide"}
            type="submit"
            disabled={!formState.isValid}
          >
            ADD MANGA
          </Button>
        </form>
      )}
    </>
  );
};

export default EditMangaForm;
