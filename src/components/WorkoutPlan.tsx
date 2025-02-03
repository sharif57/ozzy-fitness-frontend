import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define Type for Workout Plans
type WorkoutPlans = {
  id: number;
  title: string;
  time: string;
  description: string;
  image: string;
  rating: number;
};

const WorkoutPlan: React.FC = () => {
  // Sample data
  const plans: WorkoutPlans[] = [
    {
      id: 1,
      title: "Lost weight",
      time: "4 Week",
      description:
        "OEG FITNESS is a balanced fitness program that combines gym, nutrition, stretching and .",
      image: "/images/plan1.png",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Musculoskeletal Issues",
      time: "4 Week",
      description:
        "OEG FITNESS is a balanced fitness program that combines gym, nutrition, stretching and .",
      image: "/images/plan2.png",
      rating: 4.9,
    },
    {
      id: 3,
      title: "Cardiovascular Risks",
      time: "4 Week",
      description:
        "OEG FITNESS is a balanced fitness program that combines gym, nutrition, stretching and .",
      image: "/images/plan3.png",
      rating: 4.9,
    },
  ];

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-[40px]  font-semibold">Workout Plan</h2>
        <Link
          href="/workoutplan"
          className="text-blue-600 text-[18px] hover:underline font-medium"
        >
          See all
        </Link>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan: WorkoutPlans) => (
          <div
            key={plan.id}
            className="bg-white p-4 shadow-lg rounded-xl overflow-hidden"
          >
            {/* Image & Rating */}
            <div className="relative">
              <Image
                height={500}
                width={500}
                src={plan.image}
                alt={plan.title}
                className="w-full object-cover"
              />
              <div className="absolute top-2 right-2 gap-2 bg-white px-2 py-1 rounded-full flex items-center text-sm font-medium shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                    fill="#FB953B"
                  />
                </svg>{" "}
                <p className="text-[16px] text-black">{plan.rating}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-[24px] font-medium">{plan.title}</h3>
                <span className="text-gray-600 text-[16px] font-normal">
                  Time: {plan.time}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{plan.description}</p>
            </div>

            {/* Buttons */}
            <div className="p-4 flex justify-between gap-4">
              <Link href={`/workoutplan/${plan.id}`} className="w-1/2 py-2 text-[18px] text-center font-normal border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition">
                {" "}
                <button >
                  See Details
                </button>
              </Link>
              <button className="w-1/2 py-2 text-[18px] font-normal bg-[#01336F] text-white rounded-lg  transition">
                Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
