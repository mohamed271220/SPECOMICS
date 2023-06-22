import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://api.jikan.moe/v4/manga?order_by=popularity
// https://api.jikan.moe/v4/recommendations/manga
// https://api.jikan.moe/v4/top/manga

export const jikanApi = createApi({
  reducerPath: "jikanApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4/" }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (index) => `manga/${index}/news`,
    }),
    getTop: builder.query({
      query: () => `top/manga`,
    }),
    getRecommendations: builder.query({
      query: () => `recommendations/manga`,
    }),
    getPopular: builder.query({
      query: () => `manga?order_by=popularity`,
    }),
    getSingleManga: builder.query({
      query: (id) => `manga/${id}`,
    }),
    getGenreById: builder.query({
      query: (id, page) => `manga?genres=${id}?page=${page}`,
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetTopQuery,
  useGetPopularQuery,
  useGetRecommendationsQuery,
  useGetSingleMangaQuery,
  useGetGenreByIdQuery,
} = jikanApi;
