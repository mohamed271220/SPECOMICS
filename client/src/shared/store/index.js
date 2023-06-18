import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

// ===============================SLICES================================================

import { newsApi } from "./newsSlice";
// ==============================STORE SHOULD BE CALLED ONE TIME ONLY===================================
export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

// setupListeners(store.dispatch);

//===========================================EXPORTS BOTH ACTION(S) AND (STORE)=============================================================
