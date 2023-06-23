// import React from 'react'
// import { useState } from 'react';

// const PhotosUploader = ({ addedPhotos, onChange }) => {

//     const [photoLink, setPhotoLink] = useState('')
//     async function addPhotoByLink(ev) {
//         ev.preventDefault();
//         const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
//         onChange(prev => {
//             return [...prev, filename];
//         });
//         setPhotoLink('')
//     }
//     function uploadPhoto(ev) {
//         const files = ev.target.files;
//         const data = new FormData()
//         for (let i = 0; i < files.length; i++) {
//             data.append('photos', files[i])
//         }
//         axios.post('/upload', data, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         }).then(response => {
//             const { data: filenames } = response;
//             console.log(data);
//             onChange(prev => {
//                 return [...prev, ...filenames];
//             });
//         })
//     }
//     return (
//         <>
//             <div className='flex gap-2'>
//                 <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)}
//                     type="text" placeholder={'Adding using a Link .....jpg'} />
//                 <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
//             </div>

//             <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
//                 {addedPhotos.length > 0 && addedPhotos.map(link => (
//                     <div className=' h-32 flex' key={link}>
//                         <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/' + link} alt='' />
//                     </div>
//                 ))}
//                 <label className=' h-32 flex items-center gap-1  justify-center border bg-transparent rounded-2xl
//                         p-2 text-2xl text-gray-600 cursor-pointer' >
//                     <input type="file" multiple name="" id="" className='hidden'
//                         onChange={uploadPhoto} />
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
//                     </svg>

//                     Upload
//                 </label>
//             </div>
//         </>
//     )
// }

// export default PhotosUploader
//=======================================================================================================
//=======================================================================================================
//=======================================================================================================
//=======================================================================================================
// ANOTHER WAY

import React, { useState } from "react";

const MultipleImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <section className="chapter-upload">
      <label>
        + Add Images
        <br />
        <span>up to 10 images</span>
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

      <input type="file" multiple />

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="200" alt="upload" />
                <button onClick={() => deleteHandler(image)}>
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default MultipleImageUpload;

/*

*/
