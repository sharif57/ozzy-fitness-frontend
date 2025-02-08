"use client"; // Ensures this file is used only on the client

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/authSlice";
import { userApi } from "./features/userSlice";
// import { userApi } from "./features/userSlice";
// import { questionApi } from "./features/quesationSlice";
// import { answerApi } from "./features/answerSlice";
// import { packageApi } from "./features/packageSlice";
// import { roomApi } from "./features/roomSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // [questionApi.reducerPath]: questionApi.reducer,
    // [packageApi.reducerPath]: packageApi.reducer,
    // [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware)
});

export default store;

// .concat(userApi.middleware).concat(questionApi.middleware).concat(answerApi.middleware).concat(packageApi.middleware).concat(roomApi.middleware)