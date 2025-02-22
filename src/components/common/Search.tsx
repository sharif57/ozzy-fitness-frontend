"use client";
import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import {
  useAllExerciseQuery,
  useCreateWorkPlanMutation,
} from "@/redux/features/workSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Search() {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: exerciseData, isLoading } = useAllExerciseQuery(undefined);
  const { data: userData } = useUserProfileQuery();
  const user = userData?.data;

  const { data: subscriptionData } = useSubscriptionGetQuery(undefined);
  const userSubscription = subscriptionData?.data;

  // ✅ Subscription validation
  const packageName = userSubscription?.package?.name?.toLowerCase();
  const subscriptionStatus = userSubscription?.status === "active"; // Only active subscriptions allowed

  const hasWorkoutSubscription =
    packageName === "workout" && subscriptionStatus;

  const hasBothSubscription =
    packageName === "workout & nutrition" && subscriptionStatus;

  const [createWorkPlan] = useCreateWorkPlanMutation();

  const GPT_API = process.env.NEXT_PUBLIC_API_KEY_GPT_KEY;

  // Function to fetch chat response
  const handleSendMessage = async () => {

       if (!user || (!hasWorkoutSubscription && !hasBothSubscription)) {
      toast.error("You need a valid subscription to use this feature.");
      return;
    }

    setLoading(true);

    const url = "https://api.openai.com/v1/chat/completions";
    const workoutPlanMessage = createWorkoutPlanMessage();

    try {
      // Fetch GPT response
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GPT_API}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI fitness assistant.",
            },
            { role: "user", content: workoutPlanMessage },
          ],
        }),
      });

      const data = await response.json();
      const gptResponseText = data?.choices?.[0]?.message?.content || "{}";

      const planData = extractJsonData(gptResponseText);

      if (!planData) {
        throw new Error("Failed to parse GPT response into valid JSON.");
      }

      const jsonData = JSON.stringify(planData);
      const formData = new FormData();
      formData.append("data", jsonData);
      formData.append("image", exerciseData.data[0].image);

      // Save the generated plan to the database
      const result = await createWorkPlan(formData).unwrap();
      router.push(`/exercise/${result.data._id}`);
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        "Fail to generate your plan. don't suggest more than 7 days",
        {
          position: "top-center",
          autoClose: 2000, // Close the toast after 5 seconds
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to extract JSON data from GPT response
  const extractJsonData = (jsonString: string) => {
    try {
      const match = jsonString.match(/{.*}/s);
      if (match) {
        return JSON.parse(match[0]);
      } else {
        throw new Error("No valid JSON found in GPT response.");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission if inside a form
      handleSendMessage();
    }
  };

  // Function to create a workout plan message
  const createWorkoutPlanMessage = (): string => {
    if (!inputMessage || !user) return "User details are missing.";

    return `
      - Name: ${user.name}
      - Email: ${user.email}
      - Phone: ${user.phone}
      - Role: ${user.role}
      - Goal: ${inputMessage}
    
      make a workout plan based on the Goal. Check if any days type info given in goal (inputMessage) use that otherwise use 10 days.

      This is available exercise data: ${JSON.stringify(
        exerciseData.data
      )} ...exercise data can be repeated..use only _id from ${JSON.stringify(
      exerciseData.data
    )}

      in createdBy value will be ${user.role}

      give me just JSON to save in mongoose based on this schema:
const WorkoutSectionSchema = new Schema<WorkoutSection>({
  duration: { type: Number, required: true },
  exercises: { type: [Schema.Types.ObjectId], ref: 'Exercise', required: true },
});

const DayWorkoutSchema = new Schema<DayWorkout>({
  isCompleted: { type: Boolean, required: true },
  day: { type: Number, required: true },
  warmUp: { type: WorkoutSectionSchema, required: true },
  mainWorkout: { type: WorkoutSectionSchema, required: true },
  coolDown: { type: WorkoutSectionSchema, required: true },
});

const WorkoutPlanSchema = new Schema<IWorkoutPlan>({
  createdBy: { type: String, required: true },
  planName: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String, default: 'https://i.ibb.co.com/fd0nMfrB/fitness.png' },
  workouts: { type: [DayWorkoutSchema], required: true },
})  
    `;
  };

  return (
    <div>
      <div className="flex items-center  w-5/6 mx-auto bg-white/10 backdrop-blur-lg rounded-lg px- ">
        <span className="text-white/70 text-lg pl-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM17.25 14C17.25 15.7949 15.7949 17.25 14 17.25V18.75C15.7949 18.75 17.25 20.2051 17.25 22H18.75C18.75 20.2051 20.2051 18.75 22 18.75V17.25C20.2051 17.25 18.75 15.7949 18.75 14H17.25Z"
              fill="white"
            />
          </svg>
        </span>

        <input
          type="text"
          value={inputMessage}
          disabled={
            (!hasWorkoutSubscription && !hasBothSubscription) || isLoading
          }
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!hasWorkoutSubscription && !hasBothSubscription) {
                toast.warn(
                  "You need an active subscription to access this feature."
                );
                router.push("/subscription1");
              } else {
                handleSendMessage();
              }
            }
          }}
          placeholder={
            hasWorkoutSubscription || hasBothSubscription
              ? "Enter maximum 7 days workout plan"
              : "Subscription required"
          }
          className="bg-transparent w-full  text-white placeholder-white/50 outline-none px-2 py-6"
        />


        <button
          onClick={handleSendMessage}
         
          className={`bg-[#01336F] text-white lg:px-10 px-4 lg:py-6 py-6 rounded-r-lg flex items-center justify-center ${
            !hasWorkoutSubscription && !hasBothSubscription ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!hasWorkoutSubscription && !hasBothSubscription || loading}
        >
          {loading ? (
            <div className="loader-inner">
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
              <div className="loader-block"></div>
            </div>
          ) : (
            <h1 className="text-[18px] font-normal text-[#FFFFFF]">Enter</h1>
          )}
        </button>
      </div>
    </div>
  );
}

/*
"use client";
import { useSubscriptionGetQuery } from "@/redux/features/subscriptionSlice";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import {
  useAllExerciseQuery,
  useCreateWorkPlanMutation,
} from "@/redux/features/workSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Search() {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: exerciseData, isLoading } = useAllExerciseQuery(undefined);
  const { data: userData } = useUserProfileQuery();
  const user = userData?.data;

  const { data: subscriptionData } = useSubscriptionGetQuery(undefined);
  const userSubscription = subscriptionData?.data;

  // ✅ Subscription validation
  const packageName = userSubscription?.package?.name?.toLowerCase();
  const subscriptionStatus = userSubscription?.status === "active"; // Only active subscriptions allowed

  const hasWorkoutSubscription = packageName === "workout" && subscriptionStatus;

  const hasBothSubscription = packageName === "workout & nutrition" && subscriptionStatus;

  const [createWorkPlan] = useCreateWorkPlanMutation();

  const handleSendMessage = async () => {
    if (!user || (!hasWorkoutSubscription && !hasBothSubscription)) {
      toast.error("You need a valid subscription to use this feature.");
      return;
    }

    setLoading(true);

    try {
      const result = await createWorkPlan({ goal: inputMessage }).unwrap();
      router.push(`/exercise/${result.data._id}`);
    } catch (err) {
      toast.error("Failed to generate workout plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center w-5/6 mx-auto bg-white/10 backdrop-blur-lg rounded-lg px-">
      <input
  type="text"
  value={inputMessage}
  disabled={!hasWorkoutSubscription && !hasBothSubscription || isLoading}
  onChange={(e) => setInputMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      if (!hasWorkoutSubscription && !hasBothSubscription) {
        toast.warn("You need an active subscription to access this feature.");
        router.push("/subscription1");
      } else {
        handleSendMessage();
      }
    }
  }}
  placeholder={
    hasWorkoutSubscription || hasBothSubscription
      ? "Enter maximum 7 days workout plan"
      : "Subscription required"
  }
  className="bg-transparent w-full text-white placeholder-white/50 outline-none px-2 py-6"
/>
        <button
          onClick={handleSendMessage}
          className={`bg-[#01336F] text-white lg:px-10 px-4 lg:py-6 py-6 rounded-r-lg flex items-center justify-center ${
            !hasWorkoutSubscription && !hasBothSubscription ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!hasWorkoutSubscription && !hasBothSubscription || loading}
        >
          {loading ? "Loading..." : "Enter"}
        </button>
      </div>
    </div>
  );
}


*/
