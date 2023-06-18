import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

// ===============================SLICES================================================

import { jikanApi } from "./jikanSlice";
// ==============================STORE SHOULD BE CALLED ONE TIME ONLY===================================
export const store = configureStore({
  reducer: {
    [jikanApi.reducerPath]: jikanApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware),
});

// setupListeners(store.dispatch);

//===========================================EXPORTS BOTH ACTION(S) AND (STORE)=============================================================
