/* eslint-disable @next/next/no-img-element */
// "use client";

// import { Sparkles, Star } from "lucide-react";
// import React, { useState } from "react";
// import { Checkbox, Progress } from "antd";
// import Image from "next/image";
// import type { CheckboxProps } from "antd";
// import Appointment from "@/components/Appointment";
// import NutritionPlanDetails from "@/pages/NutritionPlan/NutritionPlanDetails";
// import { IoMdShareAlt } from "react-icons/io";
// import { Flex, Modal } from "antd";
// import { useNutritionDetailsQuery } from "@/redux/features/nutritionSlice";

// interface WorkoutPlan {
//   id: number;
//   title: string;
//   Nutrition: string;
//   description: string;
//   image: string;
//   rating: number;
// }

// const onChange: CheckboxProps["onChange"] = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };

// const plans: WorkoutPlan[] = [
//   {
//     id: 1,
//     title: "Bariatric Meal Plan",
//     Nutrition: "Focuses on the unique dietary needs after bariatric surgery.",
//     description:
//       "Our Bariatric Meal Plan is specially formulated for individuals who have undergone bariatric surgery. It ensures you get the necessary nutrients while maintaining a reduced calorie intake.",
//     image: "/images/food.png",
//     rating: 4.9,
//   },
//   {
//     id: 2,
//     title: "Keto Meal Plan",
//     Nutrition: "Low-carb, high-fat diet for ketosis.",
//     description:
//       "The Keto Meal Plan is ideal for those following a ketogenic diet, focusing on high fats, moderate proteins, and low carbs to promote ketosis and support fat loss.",
//     image: "/images/food2.png",
//     rating: 4.9,
//   },
//   {
//     id: 3,
//     title: "High-Protein Meal Plan",
//     Nutrition: "Boosts muscle growth and recovery.",
//     description:
//       "Designed for those who need to increase their protein intake, our High-Protein Meal Plan supports muscle maintenance and growth while promoting weight loss.",
//     image: "/images/food3.png",
//     rating: 4.9,
//   },
// ];

// const MealPlans: React.FC = () => {
//   const [openResponsive, setOpenResponsive] = useState(false);
//   const {} = useNutritionDetailsQuery()

//   return (
//     <div>
//       <div>
//         <NutritionPlanDetails></NutritionPlanDetails>
//       </div>
//       <div className="container mx-auto lg:p-6 p-2 bg-white ">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-2/3">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="lg:text-[40px] text-[20px] font-semibold mb-3">
//                   Bariatric Meal Plan
//                 </h1>
//                 <p className="text-gray-500 text-[20px] font-normal mb-5 flex items-center gap-2">
//                   <Star
//                     size={24}
//                     color="#FB953B"
//                     strokeWidth={2.75}
//                     absoluteStrokeWidth
//                     className=""
//                   />
//                   4.9 (5k reviews)
//                 </p>
//               </div>
//                 <div className="flex items-center gap-4">
//                   <Flex vertical gap="middle" align="flex-start">
//                   <Modal
//                   title="Chat with Nutritionist"
//                   centered
//                   open={openResponsive}
//                   onOk={undefined}
//                   onCancel={() => setOpenResponsive(false)}
//                   width={{
//                   xs: "90%",
//                   sm: "80%",
//                   md: "70%",
//                   lg: "60%",
//                   xl: "50%",
//                   xxl: "30%",
//                   }}
//                   footer={null}
//                   >
//                   {/* Chat Messages Container */}
//                   <div className="flex flex-col gap-4 h-[400px] overflow-y-auto">
//                   {/* Nutritionist Message */}
//                   <div className="flex gap-2">
//                   <div className="bg-blue-100 p-3 rounded-lg max-w-[80%]">
//                   <p>Hello! How can I help you with your nutrition plan today?</p>
//                   </div>
//                   </div>
//                   {/* User Message */}
//                   <div className="flex gap-2 justify-end">
//                   <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
//                   <p>I have some questions about the Bariatric Meal Plan.</p>
//                   </div>
//                   </div>
//                   </div>
//                   {/* Chat Input Area */}
//                   <div className="mt-4 flex gap-2">
//                   <input
//                   type="text"
//                   placeholder="Type your message..."
//                   className="flex-1 p-2 border rounded-lg"
//                   />
//                   <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                   Send
//                   </button>
//                   </div>
//                   </Modal>
//                   </Flex>
//                   <Sparkles
//                   onClick={() => setOpenResponsive(true)}
//                   className="size-6 cursor-pointer hover:text-blue-500"
//                   />
//                   <IoMdShareAlt
//                   className="size-6 cursor-pointer hover:text-blue-500"
//                   onClick={async () => {
//                     try {
//                     await navigator.share({
//                       title: 'Bariatric Meal Plan',
//                       text: 'Check out this great meal plan!',
//                       url: window.location.href
//                     });
//                     } catch (err) {
//                     console.log('Error sharing:', err);
//                     }
//                   }}
//                   />
//                 </div>
//             </div>
//             <Image
//               width={500}
//               height={500}
//               src="/images/food.png"
//               alt="Bariatric Meal Plan"
//               className="w-full rounded-lg object-cover"
//             />
//             <div className="p-6 flex flex-col items-center">
//               <Flex
//                 wrap
//                 gap="small"
//                 className="w-full flex justify-between items-center relative"
//               >
//                 {[
//                   { label: "Calories", percent: 70, color: "#01336F" },
//                   { label: "Protein", percent: 77, color: "#B1DD34" },
//                   { label: "Carbs", percent: 97, color: "#FED161" },
//                   { label: "Fat", percent: 70, color: "#FEA4A4" }, // Custom Color for Fat
//                   { label: "Fiber", percent: 90, color: "#C7A8FF" },
//                 ].map((item, index, array) => (
//                   <div
//                     key={index}
//                     className="flex flex-col items-center justify-center relative p-4"
//                   >
//                     {/* Right Side Divider (Border) */}
//                     {index !== array.length - 1 && (
//                       <div className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 h-24 border-r-2 border-gray-400"></div>
//                     )}

//                     <Progress
//                       type="circle"
//                       percent={item.percent}
//                       size={60}
//                       strokeWidth={15}
//                       strokeColor={{
//                         "0%": item.label === "Fat" ? "#FEA4A4" : item.color, // Custom Color for Fat
//                         "100%": item.label === "Fat" ? "#FEA4A4" : item.color, // Custom Color for Fat
//                       }}
//                     />
//                     <label className="mt-3 text-lg font-medium text-gray-700">
//                       {item.label}
//                     </label>
//                   </div>
//                 ))}
//               </Flex>
//             </div>

//             <hr className="border  border-gray-400 " />

//             <div className="mt-6">
//               <h2 className="text-[32px] font-medium mb-3">Ingredients</h2>
//               <ul className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
//                 {[
//                   "1 chopped green zucchini, spinach, arugula",
//                   "100g grilled chicken breast (or tofu)",
//                   "1/2 cup cherry tomatoes",
//                   "1 tbsp lemon juice",
//                   "1 tbsp olive oil",
//                   "Salt and pepper to taste",
//                 ].map((ingredient, index) => (
//                   <li key={index}>
//                     {" "}
//                     <Checkbox onChange={onChange}>
//                       {" "}
//                       <p className="text-[18px] font-normal text-[#333333]">
//                         {ingredient}
//                       </p>
//                     </Checkbox>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-12">
//               <h2 className="text-[32px] font-medium mb-3">Instructions</h2>
//               <ol className="list-decimal list-inside text-gray-700 space-y-2">
//                 {[
//                   "Preheat the oven to 375°F (190°C).",
//                   "Chop the vegetables and mix them in a bowl.",
//                   "Marinate the chicken with olive oil, lemon, and salt.",
//                   "Bake the chicken for 20 minutes or grill it.",
//                   "Mix the cooked chicken with the veggies and serve.",
//                 ].map((step, index) => (
//                   <li key={index} className="flex flex-col items-start gap-2 ">
//                     <span className="font-normal text-[20px] text-">
//                       Step {index + 1}:
//                     </span>
//                     <span className="text-[18px] text-gray-600 font-normal">{step}</span>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>

// {/* Related Recipes Section - Right Side */}
// <div className="md:w-1/3 mt-5 space-y-14 ">
//   <div className="border p-4 rounded-lg">
//     <h2 className="text-xl font-semibold mb-3">Related Recipes</h2>
//     <div className="space-y-3">
//       {plans.map((plan) => (
//         <div
//           key={plan.id}
//           className="lg:flex gap-3 items-center  p-3 rounded-lg shadow-sm"
//         >
//           <Image
//             width={500}
//             height={200}
//             src={plan.image}
//             alt={plan.title}
//             className="w-24 h-16 rounded-md object-cover"
//           />
//           <div>
//             <h3 className="text-md font-medium">{plan.title}</h3>
//             <p className="text-sm text-gray-500">{plan.Nutrition}</p>
//           </div>
//           <span className="ml-auto text-[#545454] font-normal flex gap-2 items-center">
//             <Star
//               size={16}
//               color="#FB953B"
//               strokeWidth={2.75}
//               absoluteStrokeWidth
//               className=""
//             />{" "}
//             {plan.rating}
//           </span>
//         </div>
//       ))}
//     </div>
//   </div>

//           </div>
//         </div>
//       </div>
//       <div className="">
//         <Appointment></Appointment>
//       </div>
//     </div>
//   );
// };

// export default MealPlans;

"use client";

import { Sparkles, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Checkbox, Progress, Modal, Flex } from "antd";
import type { CheckboxProps } from "antd";
import Appointment from "@/components/Appointment";
import { IoMdShareAlt } from "react-icons/io";
import { useParams } from "next/navigation";
import { useNutritionDetailsQuery } from "@/redux/features/nutritionSlice";
import NutritionPlanDetails from "@/pages/NutritionPlan/NutritionPlanDetails";
import Link from "next/link";
import Loading from "@/components/Loading";

const onChange: CheckboxProps["onChange"] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const MealPlans: React.FC = () => {
  const params = useParams();
  const id = params?.id as string; // Get nutrition plan ID from URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY; // Ensure this is set in .env.local

  const { data, isLoading, error } = useNutritionDetailsQuery(id);
  const nutrition = data?.data?.nutrition;

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    console.log("Nutrition Data:", nutrition);
  }, [nutrition]);

  if (isLoading) return <div className="text-center mt-10"><Loading></Loading></div>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load nutrition details.
      </p>
    );

  // Ensure correct image path
  const imageUrl = nutrition?.image?.startsWith("http")
    ? nutrition.image
    : `${API_BASE_URL}${nutrition?.image}`;

  return (
    <div>
      <div>
        <NutritionPlanDetails></NutritionPlanDetails>
      </div>
      <div className="container mx-auto lg:p-6 p-2 bg-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="lg:text-[40px] text-[20px] font-semibold mb-3">
                  {nutrition?.title}
                </h1>
                <p className="text-gray-500 text-[20px] font-normal mb-5 flex items-center gap-2">
                  <Star
                    size={24}
                    color="#FB953B"
                    strokeWidth={2.75}
                    absoluteStrokeWidth
                  />
                  {nutrition?.rating} ({nutrition?.reviewsCount} reviews)
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Sparkles
                  onClick={() => setOpenModal(true)}
                  className="size-6 cursor-pointer hover:text-blue-500"
                />
                <IoMdShareAlt
                  className="size-6 cursor-pointer hover:text-blue-500"
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: nutrition?.title,
                        text: "Check out this great meal plan!",
                        url: window.location.href,
                      });
                    } catch (err) {
                      console.log("Error sharing:", err);
                    }
                  }}
                />
              </div>
            </div>

            <img
              src={imageUrl}
              alt={nutrition?.title}
              className="w-full rounded-lg object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://cdn-icons-png.flaticon.com/128/236/236831.png")
              }
            />

            {/* Progress Bars - Nutritional Values */}
            <div className="p-6 flex flex-col items-center">
              <Flex
                wrap
                gap="small"
                className="w-full flex justify-between items-center relative"
              >
                {[
                  {
                    label: "Calories",
                    value: nutrition?.calories,
                    percent: (nutrition?.calories / 500) * 100,
                    color: "#01336F",
                  },
                  {
                    label: "Protein",
                    value: nutrition?.protein,
                    percent: (nutrition?.protein / 50) * 100,
                    color: "#B1DD34",
                  },
                  {
                    label: "Carbs",
                    value: nutrition?.carbohydrate,
                    percent: (nutrition?.carbohydrate / 100) * 100,
                    color: "#FED161",
                  },
                  {
                    label: "Fat",
                    value: nutrition?.fat,
                    percent: (nutrition?.fat / 100) * 100,
                    color: "#FEA4A4",
                  },
                  {
                    label: "Fiber",
                    value: nutrition?.fiber,
                    percent: (nutrition?.fiber / 30) * 100,
                    color: "#C7A8FF",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center relative p-4"
                  >
                    {/* Right Side Divider (Border) */}
                    {index !== 4 && (
                      <div className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 h-24 border-r-2 border-gray-400"></div>
                    )}
                    <Progress
                      type="circle"
                      percent={parseFloat(item.percent.toFixed(2))} // ✅ Ensures 2 decimal places
                      size={60}
                      strokeWidth={15}
                      strokeColor={{ "0%": item.color, "100%": item.color }}
                    />
                    <label className="mt-3 text-lg font-medium text-gray-700">
                      {item.label}
                    </label>
                  </div>
                ))}
              </Flex>
            </div>

            {/* Ingredients Section */}
            <div className="mt-6">
              <h2 className="text-[32px] font-medium mb-3">Ingredients</h2>
              <ul className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {nutrition?.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <Checkbox onChange={onChange}>
                      <p className="text-[18px] font-normal text-[#333333]">
                        {ingredient}
                      </p>
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className="mt-12">
              <h2 className="text-[32px] font-medium mb-3">Instructions</h2>
              <p className="text-gray-600">{nutrition?.instruction}</p>
            </div>
          </div>
          <div className="lg:w-[520px] mt-4 ">
            <div className="border  rounded-lg p-3">
              <h1 className="text-[24px] font-semibold mb-3">
                Related Recipes
              </h1>
              {/* <div className=""> */}
                {data?.data?.relatedNutritions?.map((plan) => (
                  <Link key={plan.id} href={`/nutritionplan1/${plan._id}`}>
                    <div className="lg:flex gap-3 items-center border  my-5  p-3 rounded-lg shadow-sm">
                      <img
                        src={`${API_BASE_URL}${plan?.image}`}
                        alt={plan.title}
                        className="lg:w-[140px] w-full lg:h-[80px] h-[160px] rounded-md object-cover"
                      />
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-md font-medium">{plan.title}</h3>
                          <span className="ml-auto text-[#545454] font-normal flex gap-2 items-center">
                            <Star
                              size={16}
                              color="#FB953B"
                              strokeWidth={2.75}
                              absoluteStrokeWidth
                              className=""
                            />{" "}
                            {plan.rating}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {plan.instruction.slice(0, 100)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Chat with Nutritionist Modal */}
      <Modal
        title="Chat with Nutritionist"
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <div className="flex flex-col gap-4 h-[400px] overflow-y-auto">
          <div className="flex gap-2">
            <div className="bg-blue-100 p-3 rounded-lg max-w-[80%]">
              <p>Hello! How can I help you with your nutrition plan today?</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <p>I have some questions about {nutrition?.title}.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </Modal>

      <Appointment />
    </div>
  );
};

export default MealPlans;
