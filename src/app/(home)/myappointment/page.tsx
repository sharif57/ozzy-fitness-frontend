/* eslint-disable @next/next/no-img-element */
"use client";
import { useBookAppointmentQuery } from "@/redux/features/bookingSlice";
import React from "react";

export default function MyAppointment() {
  const { data } = useBookAppointmentQuery(undefined);

  // Base API URL from environment variables
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_KEY || "";

  // Extracting appointment data safely
  const appointments = data?.data || [];

  return (
    <div className="lg:p-6 p-3 container mx-auto">
      <h2 className="lg:text-[48px] text-[30px] font-semibold text-center mb-6">
        My Appointments
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-wrap">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const imageUrl = appointment.appointmentId?.image
              ? `${IMAGE_BASE_URL}${appointment.appointmentId.image}` // Append base URL
              : "/default-avatar.png"; // Fallback image

            return (
              <div
                key={appointment._id}
                className="bg-white shadow-md rounded-lg p-4  transition hover:shadow-xl"
              >
                <img
                  src={imageUrl}
                  alt={appointment.appointmentId?.title || "Appointment"}
                  className="w-full h-[330px] object-cover rounded-lg"
                />
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="lg:text-[24px] text-[20px] font-medium">
                      {appointment.appointmentId?.title || "No Title"}
                    </h3>
                    <p className="text-right font-bold lg:text-[32px] text-[20px] mt-2 text-[#01336F]">
                      ${appointment.paymentAmount}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="block text-gray-600">
                      Date: {appointment.selectedDate}
                    </span>
                    <span className="block text-gray-600">
                      Time: {appointment.selectedTime}
                    </span>
                  </div>

                  {/* <p
                    className={`text-sm text-center mt-2 py-1 rounded-md ${
                      appointment.paymentStatus === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.paymentStatus === "COMPLETED"
                      ? "✅ Paid"
                      : "⏳ Pending"}
                  </p> */}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            No appointments booked yet.
          </p>
        )}
      </div>
    </div>
  );
}
