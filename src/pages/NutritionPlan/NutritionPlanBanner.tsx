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
              className="text-white lg:text-[48px] text-[30px] w-4/5
 font-bold  mx-auto"
            >
              Explore Nutrition Plan
            </h1>
         
          </div>
        </div>
      </div>
    </div>
  );
}
