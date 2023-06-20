import React from "react";
import SingleManga from "../../shared/components/SingleManga/SingleManga";
import Card from "../../shared/components/UI/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";

import "./SmallMenu.css";
const SmallMenu = (props) => {
  // console.log("props is"+props);
  let content;
  if (props.CategoryTitle === "Top") {
    content = props.mangaData
      .filter((manga) => manga.rank <= 4)
      .map((manga) => {
        return (
          <SingleManga
            isHome={props.isHome}
            className={props.isHome ? "small-menu__item" : ""}
            key={manga.mal_id}
            manga={manga}
          />
        );
      });
  } 
  else if (props.CategoryTitle === "Popular") {
    content = props.mangaData
      .filter((manga) => manga.popularity <= 100)
      .map((manga) => {
        return (
          <SingleManga
            isHome={props.isHome}
            className={props.isHome ? "small-menu__item" : ""}
            key={manga.mal_id}
            manga={manga}
          />
        );
      });
  }
  else if (props.CategoryTitle === "Recommended") {
    content = props.mangaData
      .map((manga) => {
        const entry = manga.entry.map((manga) => manga);
        return <SingleManga key={entry[0].mal_id} manga={entry[0]} />;
      })
      .sort(() => 0.5 - Math.random()).slice(0, 4)
  } 

  return (
    <Card className="small-menu">
      <h1>{props.CategoryTitle}</h1>
      <div className="small-menu-container">{content}</div>
      <Button danger size="lean" to={`/discover/${props.CategoryTitle}`}>
        SEE MORE
      </Button>
    </Card>
  );
};

export default SmallMenu;
