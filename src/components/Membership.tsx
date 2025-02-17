


'use client'
import { useAllPackageGetQuery } from "@/redux/features/packageSlice";
import { ShieldCheck } from "lucide-react";
import React from "react";
import Loading from "./Loading";
import {  useSubscriptionMutation } from "@/redux/features/subscriptionSlice";

// Define Type for Membership Plans
interface PackageData {
  _id: string;
  name: string;
  unitAmount: number;
  description: string[];
}

type MembershipPlanType = {
  id: string;
  title: string;
  price: string;
  features: string[];
};

const Membership: React.FC = () => {
  const { data, error, isLoading } = useAllPackageGetQuery(undefined);
  const [subscription] = useSubscriptionMutation();

  // const {data: subscriptionGet} = useSubscriptionGetQuery(undefined)

  // console.log(subscriptionGet?.data?.result)

  // const handleSubscription = async (packageId: string) => {
  //   try {
  //     const response = await subscription({ packageId }).unwrap();
  //     console.log(response)
  //     if (response.success && response.url) {
  //       // Open the Stripe Checkout URL in a new tab
  //       window.location.href = (response.url, "_blank");
  //     }
  //   } catch (err) {
  //     console.error("Subscription failed:", err);
  //   }
  // };

  const handleSubscription = async (packageId: string) => {
    try {
      const response = await subscription({ packageId }).unwrap();
      console.log(response.url);
      if ( response.url) {
        const newTab = window.open("", "_blank"); // Open a blank new tab first
        if (newTab) {
          newTab.location.href = response.url; // Redirect in the new tab
        } else {
          // Fallback if popup blocked
          window.location.href = response.url;
        }
      }
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };
  
  

  if (isLoading) return <div className="text-center"><Loading /></div>;
  if (error) return <div>Error loading plans.</div>;

  // Map API data to MembershipPlanType
  const plans: MembershipPlanType[] = data?.data?.map((plan: PackageData) => ({
    id: plan._id,
    title: plan.name,
    price: `$${plan.unitAmount}/month`, // Convert unitAmount to dollars
    features: plan.description,
  })) || [];

  return (
    <div className="px-2 md:px-12 lg:px-20 py-10 mx-auto max-w-[1580px]">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="lg:text-[48px] text-[30px] font-semibold">Membership Plan</h2>
        <p className="text-gray-500 mt-2">
          Strong bodies start with smart choices. Empowering healthier, happier
          lives.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <p className="text-[#01336F] text-center text-lg font-medium mt-1">
                {plan.price}
              </p>
              <hr className="my-4" />
            </div>

            {/* Features List */}
            <ul className="space-y-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-gray-600"
                >
                  <span className="text-[#01336F]">
                    <ShieldCheck />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Purchase Button */}
            <button
              onClick={() => handleSubscription(plan.id)}
              className="w-full text-center bg-[#01336F] text-white rounded-lg py-3 mt-6 hover:bg-[#012A5E] transition"
            >
              Purchase Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;