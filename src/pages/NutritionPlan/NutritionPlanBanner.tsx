import React from "react";

export default function NutritionBanner() {
  return (
    <div>
      {" "}
      <div>
        <div className="relative h-[50vh] md:h-[70vh] lg:h-[calc(100vh-2px)] xl:h-[calc(100vh-400px)] w-full flex items-center justify-center">
          {/* Background Image with Opacity */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-90 "
            style={{ backgroundImage: `url('/images/NutritionBanner.png')`}}
          ></div>

          {/* Overlay to ensure text visibility */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative text-center space-y-5 z-10  ">
            <h1
              className="text-white lg:text-[48px] text-[40px] w-4/5
 font-bold  mx-auto"
            >
              Create your Nutrition Plan
            </h1>
            <div className="flex items-center  w-5/6 mx-auto bg-white/10 backdrop-blur-lg rounded-lg px- ">
              {/* Icon */}
              <span className="text-white/70 text-lg pl-4">✨</span>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter your prompt.."
                className="bg-transparent w-full  text-white placeholder-white/60 outline-none px-2 py-6"
              />

              {/* Submit Button */}
              <button className="bg-[#01336F] text-white lg:px-8 px-4 lg:py-6 py-2 rounded-r-lg">
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
