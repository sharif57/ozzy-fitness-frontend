'use client'
import { useState } from "react";

// Define Type for Form Data
type FormData = {
  gender: string;
  age: string;
  height: string;
  heightUnit: "cm" | "ft";
  weight: string;
  weightUnit: "kg" | "lbs";
  country: string;
  fitnessLevel: "Basic" | "Intermediate" | "Advanced";
  injuries: "Lower back" | "Knee pain" | "Shoulder pain" | "None";
};

const FitnessForm = () => {
  // State with Type
  const [formData, setFormData] = useState<FormData>({
    gender: "Male",
    age: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
    country: "Spain",
    fitnessLevel: "Basic",
    injuries: "Lower back",
  });

  // Input & Select Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value as string });
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Gender */}
          <label className="block text-gray-700">Please select your Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Age */}
          <label className="block text-gray-700">What is your age?</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            className="w-full p-2 border rounded-lg"
          />

          {/* Height */}
          <label className="block text-gray-700">What is your Height?</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Height"
              className="w-full p-2 border rounded-lg"
            />
            <select
              name="heightUnit"
              value={formData.heightUnit}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>
          </div>

          {/* Weight */}
          <label className="block text-gray-700">What is your Weight?</label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="w-full p-2 border rounded-lg"
            />
            <select
              name="weightUnit"
              value={formData.weightUnit}
              onChange={handleChange}
              className="p-2 border rounded-lg"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>

          {/* Country */}
          <label className="block text-gray-700">Which country are you from?</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Spain">Spain</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>

          {/* Fitness Level */}
          <label className="block text-gray-700">Fitness Level?</label>
          <select
            name="fitnessLevel"
            value={formData.fitnessLevel}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Injuries */}
          <label className="block text-gray-700">Any injuries</label>
          <select
            name="injuries"
            value={formData.injuries}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Lower back">Lower back</option>
            <option value="Knee pain">Knee pain</option>
            <option value="Shoulder pain">Shoulder pain</option>
            <option value="None">None</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FitnessForm;
