import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";

const AddChapter = () => {
  const { readId } = useParams();
  console.log({ readId });
  const [title, setTitle] = useState("");
  const [chapterNumber, setChapterNumber] = useState("");

  const [addedPhotos, setAddedPhotos] = useState([]);

  const [redirect, setRedirect] = useState(false);

  async function savePlace(ev) {
    ev.preventDefault();
    const mangaData = {
      title,
      chapterNumber,
      addedPhotos,
    };

    await axios.post("/manga/" + readId + "/addChapter", mangaData);
    setRedirect(true);
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response);
        const { data: filenames } = response;
        // console.log(filenames);

        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // if (redirect) {
  //   return <Navigate to={"/account/places"} />;
  // }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }
  function selectAsMain(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  }
  return (
    <>
      <nav />
      <div>
        <form onSubmit={savePlace}>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm">make it short and catchy</p>
          <input
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            type="text"
            placeholder="title, for example: My Home"
          />
          <h2 className="text-2xl mt-4">ChapchapterNumber</h2>
          <p className="text-gray-500 text-sm">chapterNumber to your place</p>
          <input
            value={chapterNumber}
            onChange={(ev) => setChapterNumber(ev.target.value)}
            type="text"
            placeholder="ChapchapterNumber"
          />
          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-gray-500 text-sm">more = better</p>

          <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div className=" h-32 flex relative" key={link}>
                  <img
                    className="rounded-2xl w-full object-cover"
                    src={"http://localhost:8080" + link}
                    alt=""
                  />
                  <button
                    onClick={(ev) => removePhoto(ev, link)}
                    className=" cursor-pointer absolute bottom-1 right-1 text-white
                                bg-black p-1 bg-opacity-50 rounded-2xl py-2 px-3
                                "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={(ev) => selectAsMain(ev, link)}
                    className=" cursor-pointer absolute bottom-1 left-1 text-white
                               bg-black p-1 bg-opacity-50 rounded-2xl py-2 px-3
                                "
                  >
                    {link === addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {link !== addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            <label
              className=" h-32 flex items-center gap-1  justify-center border bg-transparent rounded-2xl
                        p-2 text-2xl text-gray-600 cursor-pointer"
            >
              <input
                type="file"
                multiple
                name=""
                readId=""
                className="hidden"
                onChange={uploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload
            </label>
          </div>

          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddChapter;
