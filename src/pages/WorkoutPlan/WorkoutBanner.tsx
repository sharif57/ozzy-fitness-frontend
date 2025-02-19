"use client";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import {
  useAllExerciseQuery,
  useCreateWorkPlanMutation,
} from "@/redux/features/workSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function WorkoutBanner() {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [generateData, setGenerateData] = useState<any>({});

  const { data: exerciseData, isLoading } = useAllExerciseQuery(undefined);
  const { data: userData } = useUserProfileQuery();
  const user = userData?.data;

  const [createWorkPlan] = useCreateWorkPlanMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const GPT_API = process.env.NEXT_PUBLIC_API_KEY_GPT_KEY;

  // Function to fetch chat response
  const handleSendMessage = async () => {
    if (!user) {
      // setError("User details are missing.");
      return;
    }

    // setLoading(true);
    // setError(null);

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

      // Extract JSON data from GPT response
      const planData = extractJsonData(gptResponseText);

      if (!planData) {
        throw new Error("Failed to parse GPT response into valid JSON.");
      }

      console.log("Parsed GPT Response:", planData);

      const jsonData = JSON.stringify(planData);

      const formData = new FormData();
      formData.append("data", jsonData);
      formData.append("image", exerciseData.data[0].image);

      // Save the generated plan to the database
      const result = await createWorkPlan(formData).unwrap();
      console.log("Workout plan saved:", result);

      router.push(`/exercise/${result.data._id}`);

      // Update state with the generated data
      // setGenerateData(planData);
    } catch (err) {
      console.error("Error:", err);
      // setError("Failed to fetch response from GPT or save the plan.");
    } finally {
      // setLoading(false);
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

  // Function to create a workout plan message
  const createWorkoutPlanMessage = (): string => {
    if (!inputMessage || !user) return "User details are missing.";

    return `
      - Name: ${user.name}
      - Email: ${user.email}
      - Phone: ${user.phone}
      - Role: ${user.role}
      - Goal: ${inputMessage}
    
      make a workout plan based on the Goal. Check if any days type info given in goal (inputMessage) use that otherwise use 30 days.

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
      {" "}
      <div>
        <div className="relative h-[50vh] md:h-[70vh] lg:h-[calc(100vh-2px)] xl:h-[calc(100vh-400px)] w-full flex items-center justify-center">
          {/* Background Image with Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-90"
            style={{ backgroundImage: `url('/images/hero.jpg')` }}
          ></div>

          {/* Overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative text-center space-y-5 z-10">
            <h1 className="text-white lg:text-[70px] text-[40px]  font-bold w-5/6 mx-auto">
              Create your workout Plan
            </h1>
            <div className="flex items-center  w-5/6 mx-auto bg-white/10 backdrop-blur-lg rounded-lg px- ">
              {/* Icon */}
              <span className="text-white/70 text-lg pl-4">✨</span>

              {/* Input Field */}
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Enter your prompt.."
                className="bg-transparent w-full  text-white placeholder-white/60 outline-none px-2 py-6"
              />

              {/* Submit Button */}
              <button
                onClick={handleSendMessage}
                className="bg-[#01336F] text-white lg:px-8 px-4 lg:py-6 py-6 rounded-r-lg"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
