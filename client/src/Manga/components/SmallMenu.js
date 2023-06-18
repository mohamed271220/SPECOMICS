import React from "react";
import SingleManga from "../../shared/components/SingleManga/SingleManga";
import Card from "../../shared/components/UI/Card/Card";
import Button from "../../shared/components/FormElements/Button/Button";

import "./SmallMenu.css";
const SmallMenu = (props) => {
  return (
    <Card className="small-menu">
      <h1>{props.CategoryTitle}</h1>
      <div className="small-menu-container">
        {props.mangaData.filter((manga) => manga.rank <=4).map((manga) => {
          return (
            <SingleManga
              isHome={props.isHome}
              className={props.isHome ? "small-menu__item" : ""}
              key={manga.id}
              manga={manga}
            />
          );
        })}
      </div>
      <Button danger size="lean" to={`/discover/${props.CategoryTitle}`}>
        SEE MORE
      </Button>
    </Card>
  );
};

export default SmallMenu;
