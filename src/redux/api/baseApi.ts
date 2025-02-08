"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://115.127.156.13:3005/api/v1", // Base URL for API requests
  }),
  tagTypes: [
    "Question",
    "Package",
    "Room",
    "User"
  ], // Declare global tag types
  endpoints: () => ({}), // To be extended by individual services
});

export default baseApi;