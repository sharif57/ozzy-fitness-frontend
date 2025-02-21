/* eslint-disable @next/next/no-img-element */

// Fetch environment variable for API base URL

// 'use client'
// import { useBookAppointmentQuery } from "@/redux/features/bookingSlice";
// import { useAllWorkPlanQuery } from "@/redux/features/workSlice";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

// interface Workout {
//   _id: string;
//   day: number;
//   isCompleted: boolean;
// }

// interface WorkoutPlan {
//   _id: string;
//   planName: string;
//   description: string;
//   image: string;
//   workouts: Workout[];
// }

// const SelectWorkoutPlan: React.FC = () => {
//   const { data, isLoading, error } = useAllWorkPlanQuery(undefined);
//   const [clientData, setClientData] = useState<WorkoutPlan[]>([]);

//   const [bookAppointment] =useBookAppointmentQuery(undefined)

//   // Ensure data is set only on the client to prevent hydration mismatch
//   useEffect(() => {
//     if (data?.data) {
//       setClientData(data.data);
//     }
//   }, [data]);

//   if (isLoading) return <p className="text-center">Loading...</p>;
//   if (error) return <p>Something went wrong!</p>;

//   return (
//     <div className="lg:px-6 md:px-12  py-10 mx-auto max-w-[1580px]">
//       {/* Header */}
//       <div className="flex justify-center items-center mb-10">
//         <h2 className="lg:text-[40px] text-2xl text-center  font-semibold">
//           Select Your Workout Plan
//         </h2>
//       </div>

//       {/* Plans Grid */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {clientData.map((plan) => (
//           <div
//             key={plan._id}
//             className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
//           >
//             {/* Image */}
//             <div className="relative">
//               <img
//                 src={`${API_BASE_URL}${plan.image}`}
//                 alt={plan.planName}
//                 className="w-full object-cover h-[290px] rounded-lg"
//               />
//             </div>

//             {/* Content */}
//             <div className="p-4 space-y-2">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-[24px] font-medium">{plan.planName}</h3>
//                 <h3 className="text-lg font-semibold">
//                   {plan.workouts.length > 0 ? `Day: ${plan.workouts[0].day}` : "No Workouts"}
//                 </h3>
//               </div>
//               <p className="text-gray-500 text-sm">{plan.description}</p>
//             </div>

//             {/* Buttons */}
//             <div className="p-4 flex justify-between gap-4">
//               <Link href={`/workoutplan1/${plan._id}`  } className="w-1/2 py-2 text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition">
//                 <button>See Details</button>
//               </Link>
//               <button className="w-1/2 py-2 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition">
//                 Add to Plan
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default SelectWorkoutPlan;

"use client";
import CardAllSkeleton from "@/components/common/Skeleton/CardAllSkeleton";
import { useBookAppointmentMutation } from "@/redux/features/userworkplanSlice";
import { useAllWorkPlanQuery } from "@/redux/features/workSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

interface Workout {
  _id: string;
  day: number;
  isCompleted: boolean;
}

interface WorkoutPlan {
  _id: string;
  planName: string;
  description: string;
  image: string;
  workouts: Workout[];
  totalDays: number;
}

const SelectWorkoutPlan: React.FC = () => {
  const { data, isLoading, error } = useAllWorkPlanQuery(undefined);
  const [clientData, setClientData] = useState<WorkoutPlan[]>([]);
  const [bookAppointment] = useBookAppointmentMutation(); // Use the mutation hook

  // Ensure data is set only on the client to prevent hydration mismatch
  useEffect(() => {
    if (data?.data) {
      setClientData(data.data);
    }
  }, [data]);

  const handleAddToPlan = async (workoutPlanId: string) => {
    // try {
    //   const result = await bookAppointment({ workoutPlanId }).unwrap();
    //   console.log("Appointment booked successfully:", result);
    //   // You can add a toast or notification here to inform the user
    // } catch (err) {
    //   console.error("Failed to book appointment:", err);
    //   // Handle error (e.g., show an error message to the user)
    // }
    try {
      const result = await bookAppointment({ workoutPlanId }).unwrap();
      console.log("Appointment booked successfully:", result);

      // ✅ Show success toast
      toast.success(result?.message, {
        position: "top-center",
        autoClose: 1000, // Toast disappears in 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.error("Failed to book appointment:", err);

      // ❌ Show error toast
      toast.error("Failed to book appointment. Please try again.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
     
    {isLoading ? (
        <CardAllSkeleton/>
      ) : 
    <div className="lg:px-6 md:px-12  py-10 mx-auto max-w-[1580px]">
      <ToastContainer></ToastContainer>
      {/* Header */}
      <div className="flex justify-center items-center mb-10">
        <h2 className="lg:text-[40px] text-2xl text-center  font-semibold">
          Select Your Workout Plan
        </h2>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientData.map((plan) => (
          <div
            key={plan._id}
            className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={`${API_BASE_URL}${plan.image}`}
                alt={plan.planName}
                className="w-full object-cover h-[290px] rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-[24px] font-medium">{plan.planName}</h3>
                <h3 className="text-lg font-semibold text-[#545454]">
                  {plan.workouts.length > 0
                    ? `Day: ${plan.totalDays}`
                    : "No Workouts"}
                </h3>
              </div>
              <p className="text-gray-500 text-sm">{plan.description}</p>
            </div>

            {/* Buttons */}
            <div className="p-4 flex justify-between gap-4">
              <Link
                href={`/workoutplan1/${plan._id}`}
                className="w-1/2 py-2 lg:text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                <button>See Details</button>
              </Link>
              <button
                onClick={() => handleAddToPlan(plan._id)}
                className="w-1/2 py-2 lg:text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition"
              >
                Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
 }
 </>
   );
 };
 
export default SelectWorkoutPlan;

/* eslint-disable @next/next/no-img-element */
// "use client";
// import { useAllWorkPlanQuery } from "@/redux/features/workSlice";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// // Fetch environment variable for API base URL
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

// interface Workout {
//   _id: string;
//   day: number;
//   isCompleted: boolean;
// }

// interface WorkoutPlan {
//   _id: string;
//   planName: string;
//   description: string;
//   image: string;
//   workouts: Workout[];
// }

// const WorkoutPlan: React.FC = () => {
//   const { data, isLoading, error } = useAllWorkPlanQuery(undefined);
//   const [clientData, setClientData] = useState<WorkoutPlan[]>([]);

//   // Ensure data is set only on the client to prevent hydration mismatch
//   useEffect(() => {
//     if (data?.data) {
//       setClientData(data.data);
//     }
//   }, [data]);

//   if (isLoading) return <p className="text-center">Loading...</p>;
//   if (error) return <p>Something went wrong!</p>;

//   return (
//     <div className="px-6 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-[40px] font-semibold">Workout Plan</h2>
//         <Link
//           href="/workoutplan1"
//           className="text-blue-600 text-[18px] hover:underline font-medium"
//         >
//           See all
//         </Link>
//       </div>

//       {/* Plans Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {clientData.map((plan) => (
//           <div
//             key={plan._id}
//             className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
//           >
//             {/* Image */}
//             <div className="relative">
//               <img
//                 src={`${API_BASE_URL}${plan.image}`}
//                 alt={plan.planName}
//                 className="w-full object-cover h-[290px] rounded-lg"
//               />
//             </div>

//             {/* Content */}
//             <div className="p-4 space-y-2">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-[24px] font-medium">{plan.planName}</h3>
//                 <h3 className="text-lg font-semibold">
//                   {plan.workouts.length > 0 ? `Day: ${plan.workouts[0].day}` : "No Workouts"}
//                 </h3>
//               </div>
//               <p className="text-gray-500 text-sm">{plan.description}</p>
//             </div>

//             {/* Buttons */}
//             <div className="p-4 flex justify-between gap-4">
//               <Link href={`/workoutplan1/${plan._id}`  } className="w-1/2 py-2 text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition">
//                 <button>See Details</button>
//               </Link>
//               <button className="w-1/2 py-2 text-[18px] font-normal bg-[#01336F] text-white rounded-lg transition">
//                 Add to Plan
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkoutPlan;
