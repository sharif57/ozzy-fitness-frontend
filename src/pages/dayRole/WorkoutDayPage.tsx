import { MessageSquareShare } from "lucide-react";
import Image from "next/image";
import React from "react";

interface IExercise {
  title: string;
  image: string;
  description: string;
  time: string;
}

interface Section {
  title: string;
  duration: string;
  exercises: IExercise[];
}

const WorkoutDayPage: React.FC = () => {
  const sections: Section[] = [
    {
      title: "Warm-Up",
      duration: "Duration Time: 5–10 min",
      exercises: [
        {
          title: "Jumping Jacks",
          image: "/images/gif/gif1.gif",
          description:
            "Jumping Jacks are a classic full-body exercise that combines cardio, coordination, and strength. They are perfect for warming up, improving cardiovascular fitness, and enhancing overall endurance.",
          time: "5 minutes",
        },
        {
          title: "High Knee",
          image: "/images/gif/gif2.gif",
          description:
            "High Knees is a simple yet effective exercise that combines cardio and lower-body strength training. It’s great for warming up, burning calories, and improving your coordination and agility.",
          time: "5 minutes",
        },
        {
          title: "Arm Rotation",
          image: "/images/gif/gif3.gif",
          description:
            "Arm swings are a dynamic stretching exercise used to improve flexibility, mobility, and blood flow in the shoulders, arms, and upper body. They are often included in warm-up routines before physical activity",
          time: "5 minutes",
        },
        {
          title: "Leg Swing",
          image: "/images/gif/gif4.gif",
          description:
            "Leg swings are a dynamic stretching exercise designed to increase flexibility, mobility, and balance in the hips, legs, and lower body. They're commonly used in warm-ups, especially for activities like running, yoga, or sports.",
          time: "5 minutes",
        },
      ],
    },
    {
      title: "Main Workout",
      duration: "12 - 15 min",
      exercises: [
        {
          title: "Burpees Squats",
          image: "/images/gif/gif5.gif",
          description:
            "Arm swings are a dynamic stretching exercise used to improve flexibility, mobility, and blood flow in the shoulders, arms, and upper body. They are often included in warm-up routines before physical activity",
          time: "5 minutes",
        },
        {
          title: "Push-Up",
          image: "/images/gif/gif6.gif",
          description:
            "Push-ups are a fundamental bodyweight exercise that targets the chest, shoulders, triceps, and core. They are effective for building strength, improving endurance, and enhancing overall upper-body stability.",
          time: "5 minutes",
        },
        {
          title: "Sit-Up",
          image: "/images/gif/gif7.gif",
          description:
            "Arm circles are a simple yet effective dynamic warm-up exercise that targets the shoulders, arms, and upper back. They are ideal for increasing mobility, improving posture, and warming up the upper body before exercise.",
          time: "5 minutes",
        },
        {
          title: "Plank & Downward Dog Stretch",
          image: "/images/gif/gif8.gif",
          description:
            "The Plank to Downward Dog Stretch is a dynamic movement that combines core strengthening with a stretch for the shoulders, hamstrings, and calves. It’s ideal for warming up, improving flexibility, and promoting stability.",
          time: "5 minutes",
        },
      ],
    },
    {
      title: "Cool Down",
      duration: "5 - 7 min",
      exercises: [
        {
          title: "Burpees Squats",
          image: "/images/gif/gif5.gif",
          description:
            "Arm swings are a dynamic stretching exercise used to improve flexibility, mobility, and blood flow in the shoulders, arms, and upper body. They are often included in warm-up routines before physical activity",
          time: "5 minutes",
        },
        {
          title: "Push-Up",
          image: "/images/gif/gif6.gif",
          description:
            "Push-ups are a fundamental bodyweight exercise that targets the chest, shoulders, triceps, and core. They are effective for building strength, improving endurance, and enhancing overall upper-body stability.",
          time: "5 minutes",
        },
        {
          title: "Sit-Up",
          image: "/images/gif/gif7.gif",
          description:
            "Arm circles are a simple yet effective dynamic warm-up exercise that targets the shoulders, arms, and upper back. They are ideal for increasing mobility, improving posture, and warming up the upper body before exercise.",
          time: "5 minutes",
        },
        {
          title: "Plank & Downward Dog Stretch",
          image: "/images/gif/gif8.gif",
          description:
            "The Plank to Downward Dog Stretch is a dynamic movement that combines core strengthening with a stretch for the shoulders, hamstrings, and calves. It’s ideal for warming up, improving flexibility, and promoting stability.",
          time: "5 minutes",
        },
      ],
    },
  ];

  return (
    <div className="bg-[#FAFAFA]">
      <div className="container mx-auto lg:p-6 p-2   rounded-lg">
        <div className="flex justify-between items-center mb-8 mt-12">
          <h1 className="text-[32px] font-bold ">Day: 01</h1>
          <p className="text-[#333333] text-[18px] font-medium">1/10 Day</p>
        </div>
        {sections.map((section, index) => (
          <div key={index} className="mb-8 border rounded-2xl p-6 bg-white">
            <div className="flex justify-between items-center border-b   pb-2 mb-4">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <span className="text-gray-500">{section.duration}</span>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1  gap-10">
              {section.exercises.map((exercise, idx) => (
                <div
                  key={idx}
                  className=" rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="py-4 space-y-2 flex items-center justify-between">
                    <div>
                      <h3 className=" lg:text-[24px] font-bold">
                        {exercise.title}
                      </h3>
                      <p className="text-sm font-normal text-gray-600">
                        Duration Time: {exercise.time}
                      </p>
                    </div>
                    <div className="p-2 rounded-full border-2">
                      <MessageSquareShare className="" />
                    </div>
                  </div>
                  <Image
                    height={464}
                    width={766}
                    src={exercise.image}
                    alt={exercise.title}
                    className="w-full rounded-lg bg-cover lg:h-[464px]"
                  />
                  <p className="lg:text-[18px] font-normal text-[#545454] pt-5 ">
                    {exercise.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-4 flex justify-end gap-4">
          <button className="py-2 text-[18px] font-normal px-8 border border-black rounded-lg text-gray-700 hover:bg-gray-100 transition w-[140px] h-[48px] flex items-center justify-center">
            Previous
          </button>
          <button className="py-2 text-[18px] font-normal px-8 bg-[#01336F] text-white rounded-lg transition w-[140px] h-[48px] flex items-center justify-center">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDayPage;
