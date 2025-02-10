// "use client"; // Ensures this file is used only on the client

// import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./features/authSlice";
// import { userApi } from "./features/userSlice";
// import { workApi } from "./features/workSlice";


// const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//     [userApi.reducerPath]: userApi.reducer,
//     [workApi.reducerPath]: workApi.reducer
//     // [questionApi.reducerPath]: questionApi.reducer,
//     // [packageApi.reducerPath]: packageApi.reducer,
//     // [roomApi.reducerPath]: roomApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware).concat(workApi.middleware)
  
// });

// export default store;

// // .concat(userApi.middleware).concat(questionApi.middleware).concat(answerApi.middleware).concat(packageApi.middleware).concat(roomApi.middleware)


import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
