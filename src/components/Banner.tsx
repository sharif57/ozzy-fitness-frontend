const Banner = () => {
  return (
    <div>
      <div className="relative h-[50vh] md:h-[70vh] lg:h-[calc(100vh-2px)] xl:h-[calc(100vh-64px)] w-full flex items-center justify-center">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: `url('/images/hero.jpg')` }}
        ></div>

        {/* Overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative text-center space-y-5 z-10">
          <p className="text-white/70 text-[18px] font-medium">
            Find Your Energy
          </p>
          <h1 className="text-white lg:text-[70px] text-[40px]  font-bold w-5/6 mx-auto">
            Create your workout Plan
          </h1>
          <div className="flex items-center  w-5/6 mx-auto bg-white/10 backdrop-blur-lg rounded-lg px- ">
            {/* Icon */}
            <span className="text-white/70 text-lg pl-4">✨</span>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter your prompt.."
              className="bg-transparent w-full  text-white placeholder-white/60 outline-none px-2"
            />

            {/* Submit Button */}
            <button className="bg-blue-800 text-white lg:px-8 px-4 lg:py-4 py-2 rounded-r-lg">
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
