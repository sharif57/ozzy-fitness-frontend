"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Appointment from "@/components/Appointment";
import WorkoutBanner from "@/pages/WorkoutPlan/WorkoutBanner";
import { useWorkPlanDetailsQuery } from "@/redux/features/workSlice";
import Link from "next/link";

export default function WorkoutPlanPage() {
  const params = useParams(); // Get the params as a Promise
  const [workoutId, setWorkoutId] = useState<string | null>(null);

  // Unwrap the params correctly
  useEffect(() => {
    if (params?.id) {
      setWorkoutId(params.id as string);
    }
  }, [params]);

  const { data, isLoading, error } = useWorkPlanDetailsQuery(workoutId, {
    skip: !workoutId, // Prevent unnecessary API calls when `workoutId` is null
  });

  if (isLoading) return <p>Loading workout plan...</p>;
  if (error) return <p>Error loading data.</p>;

  const workoutPlan = data?.data?.workouts || [];

  return (
    <div>
      <WorkoutBanner />
      <div className="bg-[#fafafa]">
        <div className="container mx-auto lg:p-6 p-2 mb-16">
          <h1 className="lg:text-[48px] text-3xl font-semibold text-center my-10 text-[#000000]">
            Plan Overview
          </h1>

          {/* Header */}
          <h1 className="lg:text-[32px] text-2xl font-semibold mb-4">
            Workout Plan
          </h1>



          {/* Content */}
          <div className="bg-white shadow-lg rounded-lg lg:p-6 mt-4">
            <h2 className="text-lg font-semibold">
              Focus: {data?.data?.description || "Build strength and establish consistency."}
            </h2>

            {/* Workout Plan Table */}
            <div className="mt-4 max-h-[650px] overflow-y-auto border border-gray-300 rounded-lg custom-scrollbar">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#e6ebf1] z-10">
                  <tr>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/6">
                      Day
                    </th>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                      Warm-up
                    </th>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                      Main Workout
                    </th>
                    <th className="border border-gray-300 px-4 py-6 text-left w-1/3">
                      Cool Down
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workoutPlan.map((day: WorkoutDay) => (
                    <tr key={day._id} className="border border-gray-300">
                      <th className="px-4 py-3 font-semibold text-left text-[#545454] border-r">
                        Day {day.day}
                      </th>
                      <td className="px-4 py-3">
                        {day.warmUp.exercises.map((exercise) => (
                          <p key={exercise._id} className="text-gray-600">
                            {exercise.exerciseName}
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-3">
                        {day.mainWorkout.exercises.map((exercise) => (
                          <p key={exercise._id} className="text-gray-600">
                            {exercise.exerciseName}
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-3">
                        {day.coolDown.exercises.map((exercise) => (
                          <p key={exercise._id} className="text-gray-600">
                            {exercise.exerciseName}
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
          <Link href="/workoutplan1/day" className="flex justify-end mt-16">
            <button className="px-10 py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition">
              Add to Plan
            </button>
          </Link>
        </div>
      </div>
      <Appointment />
    </div>
  );
}
