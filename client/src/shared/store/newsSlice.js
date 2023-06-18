import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const initialNewsState = { news: [], index: 13, loading: false, error: "" };

// export const getNews = async () => {
//   return await axios
//     .get("https://api.jikan.moe/v4/manga/13/news")
//     .then((res) => res.data);
// };

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4/" }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (index) => `manga/${index}/news`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
