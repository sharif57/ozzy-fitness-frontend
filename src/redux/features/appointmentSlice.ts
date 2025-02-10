'use client'
import baseApi from "../api/baseApi";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    appointmentAll: builder.query({
      query: () => ({
        url: "/appointment/all-appointment",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Room"],
    }),

    appointmentDetails: builder.query({
        query: (_id) => ({
          url: `/appointment//appointment-details/${_id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }),
        providesTags: ["Question"], // Marks the fetched data with the "Question" tag
      }),
  

  }),
});

export const { useAppointmentAllQuery, useAppointmentDetailsQuery } = appointmentApi;