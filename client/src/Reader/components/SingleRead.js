import React from "react";


import { Link } from "react-router-dom";

const SingleManga = (props) => {
//   if (props.isHome) {
//     return (
//       <Link to={`/manga/${props.manga.mal_id}`} className={props.className}>
//         {/* {console.log(props.manga)} */}
//         <img
//           src={
//             props.manga.images.jpg.image_url ||
//             props.manga.images.webp.image_url
//           }
//           alt={props.manga.title}
//         />
//         <div className="manga-info">
//           <h3>{props.manga.title}</h3>
//           <p>{props.manga.authors[0].name}</p>
//         </div>
//       </Link>
//     );
//   }

  return (
    <Link to={`/read/${props.manga._id}`} className="hover-card">
      <img src={ `http://localhost:8080/${props.manga.image}`} alt={props.manga.title} />
      <div className="hover-card-info">
        <h3>{props.manga.title}</h3>
        <p>{props.manga.author}</p>
      </div>
    </Link>
  );
};

export default SingleManga;
