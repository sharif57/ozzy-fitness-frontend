// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useMyWorkPlanAddQuery } from "@/redux/features/userworkplanSlice";
// import React, { useEffect, useState } from "react";

// /* Define TypeScript Interface */
// interface WorkoutPlan {
//   _id: string;
//   user: string;
//   workoutPlanId: {
//     _id: string;
//     planName: string;
//     description: string;
//     image?: string;
//   };
// }

// const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_KEY || ""; // ✅ Ensure API base URL is defined

// export default function WorkPlan() {
//   const { data } = useMyWorkPlanAddQuery(undefined);

//   // ✅ Fix Hydration Error by setting `hydrated` state
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   if (!hydrated) return null; // ✅ Prevents mismatch during SSR hydration

//   // Extract workout plans safely
//   const workPlans: WorkoutPlan[] = data?.data || [];
//   console.log(workPlans.length)

//   return (
//     <div className="lg:p-6 p-3 container mx-auto">
//       <h2 className="lg:text-[48px] text-[30px] font-semibold text-center mb-6">
//         My Workout Plan
//       </h2>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-wrap">
//         {workPlans.length > 0 ? (
//           workPlans.map((workPlan: WorkoutPlan) => {
//             const { planName, description, image } = workPlan.workoutPlanId;
//             const imageUrl = image ? `${IMAGE_BASE_URL}${image}` : "/default-workout.png"; // ✅ Fixed dynamic image handling

//             return (
//               <div
//                 key={workPlan._id}
//                 className="bg-white shadow-md rounded-lg p-4 transition hover:shadow-xl relative"
//               >
//                 {/* ✅ Fixed Hydration Issue by Ensuring Image Loads After Hydration */}
//                 {hydrated && (
//                   <img
//                     src={imageUrl}
//                     alt={planName || "Workout Plan"}
//                     className="w-full h-[250px] object-cover rounded-lg"
//                   />
//                 )}

//                 <div className="mt-4">
//                   <div className="flex justify-between items-center">
//                     <h3 className="lg:text-[20px] text-[18px] font-medium">
//                       {planName}
//                     </h3>
//                     <span className="text-gray-500 text-sm">Time: 4 Week</span>
//                   </div>

//                   <p className="text-gray-600 text-sm mt-1">{description}</p>

//                   {/* Progress Bar */}
//                   <div className="mt-4">
//                     <span className="text-gray-700 text-sm">Progress</span>
//                     <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
//                       <div
//                         className="bg-green-500 h-2.5 rounded-full"
//                         style={{ width: "60%" }} // Modify if dynamic
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-500 text-center">No workout plans available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

/* eslint-disable @next/next/no-img-element */
"use client";

import { useMyWorkPlanAddQuery } from "@/redux/features/userworkplanSlice";
import React, { useEffect, useState } from "react";

/* Define TypeScript Interface */
interface Exercise {
  _id: string;
  exerciseName: string;
  gifImage: string;
  description: string;
}

interface Workout {
  isCompleted: boolean;
  day: number;
  warmUp: { duration: number; exercises: Exercise[] };
  mainWorkout: { duration: number; exercises: Exercise[] };
  coolDown: { duration: number; exercises: Exercise[] };
}

interface WorkoutPlan {
  _id: string;
  user: string;
  totalDays: number;
  completedDays: number;
  workoutPlanId: {
    _id: string;
    planName: string;
    description: string;
    image?: string;
    workouts: Workout[];
  };
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_KEY || ""; // ✅ Ensure API base URL is defined

export default function WorkPlan() {
  const { data } = useMyWorkPlanAddQuery(undefined);

  // ✅ Fix Hydration Error by setting `hydrated` state
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // ✅ Prevents mismatch during SSR hydration

  // Extract workout plans safely
  const workPlans: WorkoutPlan[] = data?.data || [];

  return (
    <div className="lg:p-6 p-3 container mx-auto">
      <h2 className="lg:text-[48px] text-[30px] font-semibold text-center mb-6">
        My Workout Plan
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-wrap">
        {workPlans.length > 0 ? (
          workPlans.map((workPlan: WorkoutPlan) => {
            const { planName, description, image, workouts } =
              workPlan.workoutPlanId;
            const imageUrl = image
              ? `${IMAGE_BASE_URL}${image}`
              : "/default-workout.png"; // ✅ Fixed dynamic image handling
            const { totalDays, completedDays } = workPlan; // ✅ Extract totalDays & completedDays

            const total = `${parseFloat(((completedDays / totalDays) * 100).toFixed(2))}%`;
            console.log(total);

            return (
              <div
                key={workPlan._id}
                className="bg-white shadow-md rounded-lg p-4 transition hover:shadow-xl relative"
              >
                {/* ✅ Fixed Hydration Issue by Ensuring Image Loads After Hydration */}
                {hydrated && (
                  <img
                    src={imageUrl}
                    alt={planName || "Workout Plan"}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                )}

                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="lg:text-[20px] text-[18px] font-medium">
                      {planName}
                    </h3>
                    <span className="text-gray-500 text-sm">Time: 4 Week</span>
                  </div>

                  <p className="text-gray-600 text-sm mt-1">{description}</p>

                  {/* ✅ Display totalDays and completedDays */}
                  {/* <div className="mt-3">
                    <p className="text-gray-800 font-semibold">
                      Total Days: <span className="text-blue-500">{totalDays}</span>
                    </p>
                    <p className="text-gray-800 font-semibold">
                      Completed Days:{" "}
                      <span className="text-green-500">{completedDays}</span>
                    </p>
                  </div> */}

                  {/* ✅ Progress Bar based on completedDays */}
                  <div className="mt-4">
                   <div className="flex justify-between items-center">
                   <span className="text-[18px] font-bold">Progress</span>
                   <p >{total}</p>
                   </div>
                    <div className="w-full bg-gray-200 rounded-full h-[20px] mt-3">
                      <div
                        className="bg-[#00BA00] h-[20px] rounded-full"
                        style={{
                          width: `${(completedDays / totalDays) * 100}%`,
                        }} // ✅ Dynamic progress bar width
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            No workout plans available.
          </p>
        )}
      </div>
    </div>
  );
}
