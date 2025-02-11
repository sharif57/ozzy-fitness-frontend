'use client'
import baseApi from "../api/baseApi";

export const workApi = baseApi.injectEndpoints({
  overrideExisting: true,
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

    workPlanDetails: builder.query({
        query: (_id) => ({
          url: `/workout-plan/workout-plan-details/${_id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        providesTags: ["Question"], // Marks the fetched data with the "Question" tag
      }),
  

  }),
});

export const {  useAllWorkPlanQuery, useWorkPlanDetailsQuery} = workApi;