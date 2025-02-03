import { ShieldCheck } from "lucide-react";
import React from "react";

// Define Type for Membership Plans
type MembershipPlanType = {
  id: number;
  title: string;
  price: string;
  features: string[];
};

const Membership: React.FC = () => {
  // Sample Membership Plan Data
  const plans: MembershipPlanType[] = [
    {
      id: 1,
      title: "Workout",
      price: "$20/month",
      features: [
        "Start your wellness journey with the essentials.",
        "Access to beginner workout programs",
        "Basic meal plans for healthy eating",
        "Weekly fitness tips and articles",
        "Limited access to the recipe library (10 recipes/month)",
      ],
    },
    {
      id: 2,
      title: "Nutrition",
      price: "$20/month",
      features: [
        "Achieve your goals with advanced tools and guidance.",
        "Full access to workout plans (beginner to advanced)",
        "Personalized meal plans based on dietary preferences",
        "Unlimited access to the recipe library",
        "Progress tracking (fitness and nutrition metrics)",
      ],
    },
    {
      id: 3,
      title: "Workout & Nutrition",
      price: "$30/month",
      features: [
        "Get the VIP treatment for a holistic transformation.",
        "All Pro Plan benefits",
        "1-on-1 personalized fitness coaching",
        "Exclusive video tutorials and workshops",
        "Customized macronutrient tracking",
      ],
    },
  ];

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-[48px] font-semibold">Membership Plan</h2>
        <p className="text-gray-500 mt-2">
          Strong bodies start with smart choices. Empowering healthier, happier
          lives.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
        {plans.map((plan: MembershipPlanType) => (
          <div
            key={plan.id}
            className="bg-white shadow-lg rounded-xl border p-6 flex flex-col justify-between hover:bg-[#EAF1FB] transition duration-300 ease-in-out"
          >
            {/* Plan Title & Price */}
            <div>
              <h3 className="text-xl font-semibold text-center">
                {plan.title}
              </h3>
              <p className="text-blue-700 text-center text-lg font-medium mt-1">
                {plan.price}
              </p>
              <hr className="my-4" />
            </div>

            {/* Features List */}
            <ul className="space-y-5">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-gray-600"
                >
                  <span className="text-blue-600">
                    <ShieldCheck />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Purchase Button */}
            <button className="w-full bg-[#01336F] text-white rounded-lg py-3 mt-6 hover:bg-blue-800 transition">
              Purchase Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
