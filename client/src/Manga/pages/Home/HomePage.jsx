import React from "react";
import Carousel from "../../../shared/components/UI/Carousel/Carousel";
import SmallMenu from "../../components/SmallMenu";
import {useGetTopQuery} from '../../../shared/store/jikanSlice'
const HomePage = () => {

  const {data,isLoading,error}=useGetTopQuery()

  /* 
  
  modal ex top 

{
            "mal_id": 2,
            "url": "https://myanimelist.net/manga/2/Berserk",
            "images": {
                "jpg": {
                    "image_url": "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
                    "small_image_url": "https://cdn.myanimelist.net/images/manga/1/157897t.jpg",
                    "large_image_url": "https://cdn.myanimelist.net/images/manga/1/157897l.jpg"
                },
                "webp": {
                    "image_url": "https://cdn.myanimelist.net/images/manga/1/157897.webp",
                    "small_image_url": "https://cdn.myanimelist.net/images/manga/1/157897t.webp",
                    "large_image_url": "https://cdn.myanimelist.net/images/manga/1/157897l.webp"
                }
            },
            "approved": true,
            "titles": [
                {
                    "type": "Default",
                    "title": "Berserk"
                },
                {
                    "type": "Synonym",
                    "title": "Berserk: The Prototype"
                },
                {
                    "type": "Japanese",
                    "title": "ベルセルク"
                },
                {
                    "type": "English",
                    "title": "Berserk"
                }
            ],
            "title": "Berserk",
            "title_english": "Berserk",
            "title_japanese": "ベルセルク",
            "title_synonyms": [
                "Berserk: The Prototype"
            ],
            "type": "Manga",
            "chapters": null,
            "volumes": null,
            "status": "Publishing",
            "publishing": true,
            "published": {
                "from": "1989-08-25T00:00:00+00:00",
                "to": null,
                "prop": {
                    "from": {
                        "day": 25,
                        "month": 8,
                        "year": 1989
                    },
                    "to": {
                        "day": null,
                        "month": null,
                        "year": null
                    }
                },
                "string": "Aug 25, 1989 to ?"
            },
            "score": 9.47,
            "scored": 9.47,
            "scored_by": 313153,
            "rank": 1,
            "popularity": 1,
            "members": 631938,
            "favorites": 117568,
            "synopsis": "Guts, a former mercenary now known as the \"Black Swordsman,\" is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings. Setting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity. [Written by MAL Rewrite] Included one-shot: Volume 14: Berserk: The Prototype",
            "background": "Berserk won the Award for Excellence at the sixth installment of Tezuka Osamu Cultural Prize in 2002. The series has over 50 million copies in print worldwide and has been published in English by Dark Horse since November 4, 2003. It is also published in Italy, Germany, Spain, France, Brazil, South Korea, Hong Kong, Taiwan, Thailand, Poland, México and Turkey. In May 2021, the author Kentaro Miura suddenly died at the age of 54. Chapter 364 of Berserk was published posthumously on September 10, 2021. Miura would often share details about the series' story with his childhood friend and fellow mangaka Kouji Mori. Berserk resumed on June 24, 2022, with Studio Gaga handling the art and Kouji Mori's supervision.",
            "authors": [
                {
                    "mal_id": 1868,
                    "type": "people",
                    "name": "Miura, Kentarou",
                    "url": "https://myanimelist.net/people/1868/Kentarou_Miura"
                },
                {
                    "mal_id": 49592,
                    "type": "people",
                    "name": "Studio Gaga",
                    "url": "https://myanimelist.net/people/49592/Studio_Gaga"
                }
            ],
            "serializations": [
                {
                    "mal_id": 2,
                    "type": "manga",
                    "name": "Young Animal",
                    "url": "https://myanimelist.net/manga/magazine/2/Young_Animal"
                }
            ],
            "genres": [
                {
                    "mal_id": 1,
                    "type": "manga",
                    "name": "Action",
                    "url": "https://myanimelist.net/manga/genre/1/Action"
                },
                {
                    "mal_id": 2,
                    "type": "manga",
                    "name": "Adventure",
                    "url": "https://myanimelist.net/manga/genre/2/Adventure"
                },
                {
                    "mal_id": 46,
                    "type": "manga",
                    "name": "Award Winning",
                    "url": "https://myanimelist.net/manga/genre/46/Award_Winning"
                },
                {
                    "mal_id": 8,
                    "type": "manga",
                    "name": "Drama",
                    "url": "https://myanimelist.net/manga/genre/8/Drama"
                },
                {
                    "mal_id": 10,
                    "type": "manga",
                    "name": "Fantasy",
                    "url": "https://myanimelist.net/manga/genre/10/Fantasy"
                },
                {
                    "mal_id": 14,
                    "type": "manga",
                    "name": "Horror",
                    "url": "https://myanimelist.net/manga/genre/14/Horror"
                },
                {
                    "mal_id": 37,
                    "type": "manga",
                    "name": "Supernatural",
                    "url": "https://myanimelist.net/manga/genre/37/Supernatural"
                }
            ],
            "explicit_genres": [],
            "themes": [
                {
                    "mal_id": 58,
                    "type": "manga",
                    "name": "Gore",
                    "url": "https://myanimelist.net/manga/genre/58/Gore"
                },
                {
                    "mal_id": 38,
                    "type": "manga",
                    "name": "Military",
                    "url": "https://myanimelist.net/manga/genre/38/Military"
                },
                {
                    "mal_id": 6,
                    "type": "manga",
                    "name": "Mythology",
                    "url": "https://myanimelist.net/manga/genre/6/Mythology"
                },
                {
                    "mal_id": 40,
                    "type": "manga",
                    "name": "Psychological",
                    "url": "https://myanimelist.net/manga/genre/40/Psychological"
                }
            ],
            "demographics": [
                {
                    "mal_id": 41,
                    "type": "manga",
                    "name": "Seinen",
                    "url": "https://myanimelist.net/manga/genre/41/Seinen"
                }
            ]
        },


  */

  console.log(data);

  const DUMMY_DATA = {
    slides: [
      {
        src: "https://picsum.photos/seed/img1/600/400",
        alt: "Image 1 for carousel",
      },
      {
        src: "https://picsum.photos/seed/img2/600/400",
        alt: "Image 2 for carousel",
      },
      {
        src: "https://picsum.photos/seed/img3/600/400",
        alt: "Image 3 for carousel",
      },
    ],
  };

  const DUMMY_MANGA_DATA = [
    {
      id: 1,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    {
      id: 2,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    {
      id: 3,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    {
      id: 4,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    // {
    // image:,author:,title:,
    //     },{
    //       image:,author:,title:,
    //     }
  ];

  return (
    <div className="Hero">
      <Carousel data={DUMMY_DATA.slides} />
      {isLoading ? <div>Loading</div>:(
      <SmallMenu isHome CategoryTitle="Top" mangaData={data.data} />
      )}
      {/* <SmallMenu isCate CategoryTitle="Recommended" mangaData={DUMMY_MANGA_DATA} /> */}
      {/* <SmallMenu isHome CategoryTitle="Popular" mangaData={DUMMY_MANGA_DATA} /> */}
    </div>
  );
};

export default HomePage;
