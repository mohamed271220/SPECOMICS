import SkeletonPost from "../../shared/Loading/Skeleton/SkeletonPost";
import { useGetNewsQuery } from "../../shared/store/jikanSlice";
import NewsCard from "../components/News-card";
import "./News.css";

const News = () => {
  const { data, error, isLoading } = useGetNewsQuery("13");

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
        {isLoading && <SkeletonPost />}
        {!isLoading &&
          data.data.map((news) => <NewsCard key={news.mal_id} news={news} />)}
      </div>
    </div>
  );
};

export default News;
