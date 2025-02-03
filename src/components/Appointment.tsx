import Image from "next/image";
import React from "react";

type consultations = {
  consultations: {
    id: number;
    title: string;
    price: number;
    description: string[];
    image: string;
  }[];
};

const consultations = [
  {
    id: 1,
    title: "Initial Consultation",
    price: 500,
    description: [
      "Analyze your current eating habits.",
      "Personal nutrition goals.",
      "Providing healthy meal plans.",
      "Advice related to lifestyle and nutrition.",
    ],
    image: "/images/book.png",
  },
  {
    id: 2,
    title: "Talk To Fitness",
    price: 100,
    description: ["Consultation to create a program for desired goals."],
    image: "/images/book1.png",
  },
];

const Appointment = () => {
  return (
    <div className="bg-gray-50 py-10 max-w-7xl mx-auto">
      <div className="text-center mb-8 w-1/2 mx-auto">
        <h1 className="text-[48px] font-semibold">Book an Appointment</h1>
        <p className="text-gray-600 mt-2 ">
        you have arranged to see them at a particular time, usually in connection with their work or for a serious purpose
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-14">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3"
          >
            <Image
              height={400}
              width={400}
              src={consultation.image}
              alt={consultation.title}
              className="w-full  rounded-t-lg"
            />
            <div className="mt-4 ">
              <div className="flex justify-between items-center">
                <h2 className="text-[24px] font-medium ">
                  {consultation.title}
                </h2>
                <p className="text-[#01336F] font-bold text-[32px]">
                  ${consultation.price}
                </p>
              </div>
              <ul className="text-[#545454] space-y-3 mt-4 ">
                {consultation.description.map((item, index) => (
                  <li className="flex items-center gap-2" key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <path
                        d="M15.1723 11.518L13.2235 14.2732C13.1515 14.366 13.0587 14.4268 12.9451 14.446C12.8363 14.4636 12.7275 14.438 12.6347 14.374L10.1083 12.5836V15.6796C10.1083 15.9132 9.92435 16.1004 9.68915 16.1004H6.31315C6.07795 16.1004 5.88915 15.91 5.88915 15.6796V12.5836L3.36755 14.374C3.17715 14.5084 2.90995 14.4636 2.77875 14.2732L0.82995 11.518C0.69235 11.3292 0.73715 11.0636 0.92755 10.9292L4.34675 8.50039L0.92755 6.07319C0.882158 6.04101 0.843595 6.00015 0.814088 5.95297C0.784581 5.9058 0.764716 5.85324 0.755641 5.79834C0.746565 5.74344 0.74846 5.68729 0.761214 5.63313C0.773969 5.57897 0.797331 5.52787 0.82995 5.48279L2.77875 2.72759C2.90995 2.54039 3.17715 2.49239 3.36755 2.62999L5.89075 4.41719V1.32439C5.89075 1.08759 6.08115 0.900391 6.31475 0.900391H9.69235C9.92755 0.900391 10.1115 1.09079 10.1115 1.32439V4.42039L12.6379 2.62999C12.7291 2.56279 12.8379 2.54039 12.9467 2.55959C13.0619 2.57719 13.1563 2.63799 13.2267 2.72759L15.1787 5.48279C15.3099 5.67479 15.2699 5.93719 15.0811 6.07319L11.6539 8.50039L15.0779 10.9292C15.2683 11.0636 15.3067 11.3292 15.1723 11.518Z"
                        fill="url(#paint0_linear_1287_1207)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1287_1207"
                          x1="8.00273"
                          y1="0.900391"
                          x2="8.00273"
                          y2="16.1004"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#01336F" />
                          <stop offset="1" stop-color="#0262D5" />
                        </linearGradient>
                      </defs>
                    </svg>{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className=" mt-8 flex justify-between gap-4">
              <button className="w-full py-3 text-[18px] font-normal bg-[#01336F] text-white rounded-lg  transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
