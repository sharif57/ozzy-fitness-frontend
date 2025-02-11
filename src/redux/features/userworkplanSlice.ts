'use client'
import baseApi from "../api/baseApi";

export const userWorkPlanApi = baseApi.injectEndpoints({
    overrideExisting: true,
  endpoints: (builder) => ({


 

    myWorkPlanAdd: builder.query({
        query: () => ({
          url: "/work-plan/user-work-plan",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        providesTags: ["AddPlan"],
      }),

    bookAppointment: builder.mutation({
        query: (addPlan) => ({
          url: "/work-plan/user-add-work-plan",
          method: "POST",
          body: addPlan,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["AddPlan"], // Invalidates 'User' tag after mutation
      })
  

  }),
});

export const {   useBookAppointmentMutation , useMyWorkPlanAddQuery } = userWorkPlanApi;