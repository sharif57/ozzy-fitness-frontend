'use client'
import baseApi from "../api/baseApi";

export const workApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    allWorkPlan: builder.query({
      query: () => ({
        url: "/workout-plan/all-workout-plan",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Room"],
    }),



  }),
});

export const {  useAllWorkPlanQuery} = workApi;