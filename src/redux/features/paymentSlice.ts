'use client'
import baseApi from "../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    paymentData: builder.query({
      query: () => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Room"],
    }),

    // workPlanDetails: builder.query({
    //     query: (_id) => ({
    //       url: `/workout-plan/workout-plan-details/${_id}`,
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     }),
    //     providesTags: ["Question"], // Marks the fetched data with the "Question" tag
    //   }),
  

  }),
});

export const {  usePaymentDataQuery } = paymentApi;