'use client'
import baseApi from "../api/baseApi";

export const nutritionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    allNutrition: builder.query({
      query: () => ({
        url: "/nutrition/all-nutrition",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Room"],
    }),

    nutritionDetails: builder.query({
        query: (_id) => ({
          url: `/nutrition//nutriton-details/${_id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        providesTags: ["Question"], // Marks the fetched data with the "Question" tag
      }),
  

  }),
});

export const {useAllNutritionQuery , useNutritionDetailsQuery} = nutritionApi;