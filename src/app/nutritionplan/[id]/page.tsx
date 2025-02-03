import { Star } from "lucide-react";
import React from "react";
import { Flex, Progress } from "antd";
import Image from "next/image";

interface WorkoutPlan {
  id: number;
  title: string;
  Nutrition: string;
  description: string;
  image: string;
  rating: number;
}

const plans: WorkoutPlan[] = [
  {
    id: 1,
    title: "Bariatric Meal Plan",
    Nutrition: "Focuses on the unique dietary needs after bariatric surgery.",
    description:
      "Our Bariatric Meal Plan is specially formulated for individuals who have undergone bariatric surgery. It ensures you get the necessary nutrients while maintaining a reduced calorie intake.",
    image: "/images/food.png",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Keto Meal Plan",
    Nutrition: "Low-carb, high-fat diet for ketosis.",
    description:
      "The Keto Meal Plan is ideal for those following a ketogenic diet, focusing on high fats, moderate proteins, and low carbs to promote ketosis and support fat loss.",
    image: "/images/food2.png",
    rating: 4.9,
  },
  {
    id: 3,
    title: "High-Protein Meal Plan",
    Nutrition: "Boosts muscle growth and recovery.",
    description:
      "Designed for those who need to increase their protein intake, our High-Protein Meal Plan supports muscle maintenance and growth while promoting weight loss.",
    image: "/images/food3.png",
    rating: 4.9,
  },
];

const MealPlans: React.FC = () => {
  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-[40px] font-semibold mb-4">Bariatric Meal Plan</h1>
      <p className="text-gray-500 text-[20px] font-normal flex items-center gap-2">
        <Star
          size={24}
          color="#FB953B"
          strokeWidth={2.75}
          absoluteStrokeWidth
        />
        4.9 (5k reviews)
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <Image
            width={500}
            height={500}
            src="/images/food.png"
            alt="Bariatric Meal Plan"
            className="w-full rounded-lg object-cover"
          />
          <div className="p-6 flex flex-col items-center">
            <Flex
              wrap
              gap="small"
              className="w-full flex justify-between items-center relative"
            >
              {[
                { label: "Calories", percent: 70, color: "#01336F" },
                { label: "Protein", percent: 77, color: "#B1DD34" },
                { label: "Carbs", percent: 97, color: "#FED161" },
                { label: "Fat", percent: 70, color: "#FEA4A4" }, // Custom Color for Fat
                { label: "Fiber", percent: 90, color: "#C7A8FF" },
              ].map((item, index, array) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center relative p-4"
                >
                  {/* Right Side Divider (Border) */}
                  {index !== array.length - 1 && (
                    <div className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 h-24 border-r-2 border-gray-400"></div>
                  )}

                  <Progress
                    type="circle"
                    percent={item.percent}
                    size={60}
                    strokeWidth={15}
                    strokeColor={{
                      "0%": item.label === "Fat" ? "#FEA4A4" : item.color, // Custom Color for Fat
                      "100%": item.label === "Fat" ? "#FEA4A4" : item.color, // Custom Color for Fat
                    }}
                  />
                  <label className="mt-3 text-lg font-medium text-gray-700">
                    {item.label}
                  </label>
                </div>
              ))}
            </Flex>
          </div>

          <hr className="border  border-gray-400 " />

          <div className="mt-6">
            <h2 className="text-[32px] font-medium mb-3">Ingredients</h2>
            <ul className="grid grid-cols-2 gap-4 text-gray-700">
              {[
                "1 chopped green zucchini, spinach, arugula",
                "100g grilled chicken breast (or tofu)",
                "1/2 cup cherry tomatoes",
                "1 tbsp lemon juice",
                "1 tbsp olive oil",
                "Salt and pepper to taste",
              ].map((ingredient, index) => (
                <li key={index}>☐ {ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-[32px] font-medium   mb-3">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {[
                "Preheat the oven to 375°F (190°C).",
                "Chop the vegetables and mix them in a bowl.",
                "Marinate the chicken with olive oil, lemon, and salt.",
                "Bake the chicken for 20 minutes or grill it.",
                "Mix the cooked chicken with the veggies and serve.",
              ].map((step, index) => (
                <li key={index}>
                  <p>Step {index + 1}:</p> {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Related Recipes Section - Right Side */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold mb-3">Related Recipes</h2>
          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex gap-3 items-center  p-3 rounded-lg shadow-sm"
              >
                <Image
                  width={500}
                  height={200}
                  src={plan.image}
                  alt={plan.title}
                  className="w-24 h-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-md font-medium">{plan.title}</h3>
                  <p className="text-sm text-gray-500">{plan.Nutrition}</p>
                </div>
                <span className="ml-auto text-yellow-500 font-semibold">
                  ★ {plan.rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlans;
