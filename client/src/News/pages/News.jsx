import { useGetNewsQuery } from "../../shared/store/jikanSlice";
import NewsCard from "../components/News-card";
import "./News.css";

// FROM  https://api.jikan.moe/v4/manga/13/news

//   {
//     mal_id: 68944601,
//     url: "https://myanimelist.net/news/68944601",
//     title: "North American Anime & Manga Releases for April",
//     date: "2023-04-03T12:28:00+00:00",
//     author_username: "Aiimee",
//     author_url: "https://myanimelist.net/profile/Aiimee",
//     forum_url: "https://myanimelist.net/forum/?topicid=2085951",
//     images: {
//       jpg: {
//         image_url:
//           "https://cdn.myanimelist.net/s/common/uploaded_files/1680548192-1bab9dda6c4361bca1dabf3a36eefb60.jpeg?s=e070ba24ac1c31bae536e9397e941bc3",
//       },
//     },
//     comments: 3,
//     excerpt:
//       "Here are the North American anime, manga, and light novel releases for April. Week 1: April 4 - 10 Anime Releases Cowboy Bebop Complete Series Blu-ray Cowboy Bebop C...",
//   },
// ];

const News = () => {
  // using redux
  const { data, error, isLoading } = useGetNewsQuery("13");
  console.log(data);
  return (
    <div className="news-container">
      <div className="news">
        <p>Latest News</p>
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a51839c-067c-4c4e-9807-2d0df5746f1b/dcewzjw-e6d253c9-cc32-4c12-825e-35b1d421d987.jpg/v1/fill/w_1192,h_670,q_70,strp/shonen_jump_by_dinocozero_dcewzjw-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvN2E1MTgzOWMtMDY3Yy00YzRlLTk4MDctMmQwZGY1NzQ2ZjFiXC9kY2V3emp3LWU2ZDI1M2M5LWNjMzItNGMxMi04MjVlLTM1YjFkNDIxZDk4Ny5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.a1gA8K0s_wSemrvDTjHNE9TWL0Ilh-sVD4vszLKblPA"
          alt="anime"
        />
      </div>
      <img className="news-hero" src="" alt="" />
      <hr className="news-hr" />
      <div>Pagination control</div>
      <div className="news-cards">
        {!isLoading &&  data.data.map((news) => (
          <NewsCard  key={news.mal_id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default News;
