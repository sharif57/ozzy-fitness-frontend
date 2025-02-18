

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import { useAllExerciseQuery, useCreateWorkPlanMutation } from "@/redux/features/workSlice";
import React, { useState } from "react";

// Define TypeScript types for better structure
interface Message {
  sender: string;
  text: string;
}

interface Exercise {
  _id: string;
  name: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  injury: string;
  payment: boolean;
  subscription: boolean;
  isDeleted: boolean;
  verified: boolean;
}

interface Exercise {
  _id: string;
  exerciseName: string;
}

interface WorkoutSection {
  exercises: Exercise[];
}

interface WorkoutDay {
  _id: string;
  day: number;
  warmUp: WorkoutSection;
  mainWorkout: WorkoutSection;
  coolDown: WorkoutSection;
}
const ChatInterface: React.FC = () => {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generateData, setGenerateData] = useState({});

  const { data: exerciseData, isLoading } = useAllExerciseQuery(undefined);
  const { data: userData } = useUserProfileQuery();
  const user = userData?.data;


  const [createWorkPlan] = useCreateWorkPlanMutation()
  console.log(createWorkPlan)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const GPT_API = process.env.NEXT_PUBLIC_API_KEY_GPT_KEY;

  // Function to fetch chat response
  const handleSendMessage = async () => {
   
    if (!user) {
      setError("User details are missing.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = "https://api.openai.com/v1/chat/completions";
    const workoutPlanMessage = createWorkoutPlanMessage();

    try {
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
      console.log(gptResponseText,'+++++++')

      const planData = extractJsonData(gptResponseText);
      setGenerateData(planData);
      console.log(planData)


      // try {
      //   const parsedResponse = JSON.parse(gptResponseText);
      //   setGenerateData((prevMessages) => [
      //     ...prevMessages,
      //     { sender: "GPT", text: JSON.stringify(parsedResponse, null, 2) },
      //   ]);
      // } catch {
      //   setGenerateData((prevMessages) => [
      //     ...prevMessages,
      //     { sender: "GPT", text: gptResponseText },
      //   ]);
      // }
    } catch {
      setError("Failed to fetch response from GPT.");
    } finally {
      setLoading(false);
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
    
      make a workout plan based on the Goal . check  if any  days type info given in goal(inputMessage) use that otherwise use 30 day

      this is available excercise data: ${JSON.stringify(
        exerciseData.data
      )} ...excercise data can be repidate..use only _id from ${JSON.stringify(
      exerciseData.data
    )}

      in createdBy value will be ${user.role}

   give me just json to save in mongoose based on this schema:
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
  give just JSON data
    `;
  };

  function extractJsonData(jsonString: string) {
    try {
      // Use regex to match the content inside the first pair of curly braces
      const match = jsonString.match(/{.*}/s);

      if (match) {
        // Parse and return the matched part as a JSON object
        return JSON.parse(match[0]);
      } else {
        // If no match, return null or handle accordingly
        return null;
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }







  return (
    <div className="flex flex-col bg-gray-100">
     
      <div className="flex-1 flex flex-col overflow-hidden container mx-auto ">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">


          <div className="bg-white shadow-lg rounded-lg lg:p-6 mt-4">
            <h2 className="text-lg font-semibold">
            {generateData?.description ? generateData?.description : "Build strength and establish consistency"}

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
              <h1>PlanName : {generateData?.planName}</h1>
                  {generateData?.workouts?.map((day: any,i:number) => (
      
                    <tr
                      key={i}
                      className="border border-r border-gray-300"
                    >
                      <th className="px-4 py-3 font-semibold text-left text-[#545454] border-r">
                        Day {day.day}
                      </th>
                      <td className="px-4 py-3 border border-r border-gray-300">
                        {day.warmUp.exercises.length}
                      </td>
                      <td className="px-4 py-3 border border-r border-gray-300">
                      {day.mainWorkout.exercises.length}
                      </td>
                      <td className="px-4 py-3">
                        {day.coolDown.exercises.length}
                      </td>
                    </tr>
                  ))}
                </tbody> 
              </table>
            </div>
          </div>

          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
        </div>

        {/* Message Input & Send Button */}
        <div className="p-4 bg-white shadow-md flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your goal..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="p-3 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
