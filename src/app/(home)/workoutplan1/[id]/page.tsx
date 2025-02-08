"use client";
import Appointment from "@/components/Appointment";
import WorkoutBanner from "@/pages/WorkoutPlan/WorkoutBanner";
import Link from "next/link";
import React, { useState } from "react";

interface WorkoutDay {
  day: string;
  workout: string[];
}

const workoutPlan: WorkoutDay[] = [
  {
    day: "Day 01",
    workout: [
      "Full-Body Strength Training",
      "Squats: 3 sets of 12 reps",
      "Push-ups: 3 sets of 10-12 reps",
      "Bent-Over Rows (dumbbell or resistance band): 3 sets of 12 reps",
      "Plank Hold: 3 sets of 20 seconds",
    ],
  },
  {
    day: "Day 02",
    workout: ["Cardio: 20-30 minutes of jogging, brisk walking, or cycling."],
  },
  {
    day: "Day 03",
    workout: [
      "Upper Body Strength",
      "Dumbbell Shoulder Press: 3 sets of 10 reps",
      "Pull-Ups or Assisted Pull-Ups: 3 sets of 8-10 reps",
      "Dumbbell Bicep Curls: 3 sets of 12 reps",
      "Side Plank (each side): 2 sets of 20 seconds",
    ],
  },
  {
    day: "Day 04",
    workout: ["Active Recovery: Yoga or stretching (20-30 minutes)."],
  },
  {
    day: "Day 05",
    workout: [
      "Lower Body Strength",
      "Lunges: 3 sets of 10 reps/leg",
      "Romanian Deadlifts (dumbbells): 3 sets of 10 reps",
      "Calf Raises: 3 sets of 15 reps",
      "Side-Lying Leg Raises: 2 sets of 15 reps",
    ],
  },
  {
    day: "Day 06",
    workout: [
      "Lower Body Strength",
      "Lunges: 3 sets of 10 reps/leg",
      "Romanian Deadlifts (dumbbells): 3 sets of 10 reps",
      "Calf Raises: 3 sets of 15 reps",
      "Side-Lying Leg Raises: 2 sets of 15 reps",
    ],
  },
  {
    day: "Day 07",
    workout: [
      "HIIT Cardio: 20 minutes (e.g., 30 seconds sprint, 1-minute walk; repeat).",
    ],
  },
  {
    day: "Day 08",
    workout: [
      "HIIT Cardio: 20 minutes (e.g., 30 seconds sprint, 1-minute walk; repeat).",
    ],
  },
];

export default function WorkoutPlanPage() {
  const [activeTab, setActiveTab] = useState("Foundational Phase");

  return (
    <div className="">
      <WorkoutBanner></WorkoutBanner>
      <div className="bg-[#fafafa]">
        <div className="container mx-auto lg:p-6 p-2 mb-16">
          <h1 className="lg:text-[48px] text-3xl font-semibold text-center my-10 text-[#000000]">
            Plan Overview
          </h1>
          {/* Header */}
          <h1 className="lg:text-[32px] text-2xl  font-semibold mb-4">
            Workout Plan
          </h1>

          {/* Tabs */}
          <div className="flex space-x-4 border-b">
            {["Foundational Phase", "Summary"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-lg font-medium ${
                  activeTab === tab
                    ? "bg-[#01336F] text-white rounded-t-lg"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white shadow-lg rounded-lg lg:p-6  mt-4">
            <h2 className="text-lg font-semibold">
              Focus: Build strength and establish consistency.
            </h2>

            {/* Workout Plan Table (with vertical scroll when more than 6 days) */}
            <div className="mt-4 max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg custom-scrollbar">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#e6ebf1] z-10">
                  <tr>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/4">
                      Day
                    </th>
                    <th className="border border-gray-300 px-4 py-6 text-left">
                      Workout
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workoutPlan.map((item, index) => (
                    <tr key={index} className="border border-gray-300">
                      <th className="px-4 py-3 lg:font-semibold text-left lg:text-[18px] text-[#545454] border-r ">
                        {item.day}
                      </th>
                      <td className="px-4 py-3">
                        {item.workout.map((exercise, idx) => (
                          <p key={idx} className="text-gray-600">
                            {exercise}
                          </p>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add to Plan Button */}
          <Link href={'/workoutplan1/day'} className="flex justify-end mt-16">
            <button className="px-10 py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg  transition">
              Add to Plan
            </button>
          </Link>

          {/* Custom Scrollbar CSS */}
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
        </div>
      </div>
      <Appointment></Appointment>
    </div>
  );
}
