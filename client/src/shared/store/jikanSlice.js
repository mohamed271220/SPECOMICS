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
    getRecommendations: builder.query({}),
    getPopular: builder.query({}),
  }),
});

export const { useGetNewsQuery, useGetTopQuery } = jikanApi;