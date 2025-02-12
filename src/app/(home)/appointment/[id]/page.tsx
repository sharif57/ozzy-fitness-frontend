// "use client";
// import React, { useState } from "react";
// import { Calendar, Form, Input, Button, Select, Modal, Typography } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import { Dayjs } from "dayjs";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { useAppointmentDetailsQuery } from "@/redux/features/appointmentSlice";

// const { Option } = Select;
// const { Text } = Typography;

// interface AppointmentData {
//   fullName: string;
//   age: number;
//   gender: string;
//   problem?: string;
// }

// const AppointmentBooking: React.FC = () => {
//   const [form] = Form.useForm<AppointmentData>();
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const {data} =useAppointmentDetailsQuery(undefined)

//   const onSelect = (value: Dayjs) => {
//     setSelectedDate(value.format("YYYY-MM-DD"));
//   };

//   const onFinish = (values: AppointmentData) => {
//     Modal.success({
//       title: "Appointment Confirmed ✅",
//       content: (
//         <div>
//           <p>Your appointment is booked for:</p>
//           <p>
//             <strong>Date:</strong> {selectedDate} <br />
//             <strong>Time:</strong> {selectedTime}
//           </p>
//         </div>
//       ),
//     });
//     console.log("Appointment Data:", { ...values, selectedDate, selectedTime });
//   };

//   return (
//     <div
//       className="relative min-h-screen  bg-cover bg-center flex flex-col items-center pt-12"
//       style={{ backgroundImage: "url('/images/Appointment.png')" }}
//     >
//       {/* Dark overlay for better visibility */}

//       <div className="absolute inset-0 bg-black bg-opacity-70"></div>

//       {/* Content Wrapper */}
//       <div className="relative  gap-6 lg:p-6 w-full max-w-6xl z-10">
//         <div>
//           <div className="flex items-center gap-3">
//             <div className="bg-white p-2 rounded-full">
//               <ArrowLeft className="size-6 text-black" />
//             </div>
//             <h1 className="text-white text-3xl font-bold">
//               Initial Consultation
//             </h1>
//           </div>
//           <hr className="mb-12 mt-4" />
//         </div>
//         <div className="flex flex-col md:flex-row gap-6 w-full ">
//           {/* Calendar Section */}
//           <div
//             className="w-full md:w-1/2 shadow-lg p-6 rounded-lg"
//             // style={{ background: "rgba(255, 255, 255, 0.1)" }}
//           >
//             <h1 className="text-white text-2xl font-medium mb-4">
//               Select Date*
//             </h1>
//             <Calendar
//               fullscreen={false}
//               onSelect={onSelect}
//               className="border border-gray-400 rounded-md p-2"
//               style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
//               headerRender={({ value, onChange }) => (
//                 <div className="flex justify-between items-center p-2 text-white">
//                   <Button
//                     icon={<LeftOutlined />}
//                     onClick={() => onChange(value.clone().subtract(1, "month"))}
//                   />
//                   <Text className="text-lg font-medium">
//                     {value.format("MMMM YYYY")}
//                   </Text>
//                   <Button
//                     icon={<RightOutlined />}
//                     onClick={() => onChange(value.clone().add(1, "month"))}
//                   />
//                 </div>
//               )}
//             />
//             <div className="mt-4">
//               <h1 className="text-gray-200 text-2xl font-medium mb-4 mt-8">
//                 Select Time*
//               </h1>
//               <div
//                 className="flex flex-wrap justify-between gap-2"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   setSelectedTime(e.target.value)
//                 }
//               >
//                 {["09:00 AM", "10:00 AM", "01:00 PM", "03:00 PM"].map(
//                   (time) => (
//                     <label
//                       key={time}
//                       className={`px-5 py-4  rounded-lg cursor-pointer transition duration-300 border py- ${
//                         selectedTime === time
//                           ? "bg-[#01336F80] text-white"
//                           : " border-gray-300 text-gray-300"
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         value={time}
//                         name="time"
//                         className="hidden"
//                         onChange={() => setSelectedTime(time)}
//                       />
//                       {time}
//                     </label>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Patient Information Section */}
//           <div
//             className="w-full md:w-1/2 shadow-lg p-6 rounded-lg"
//             // style={{ background: "rgba(255, 255, 255, 0.1)" }}
//           >
//             <h1 className="text-gray-200 text-2xl font-medium mb-4">
//               Patient Information
//             </h1>
//             <Form layout="vertical" form={form} onFinish={onFinish}>
//               <Form.Item
//                 label={
//                   <span className="text-gray-200 text-[18px]">Full Name*</span>
//                 }
//                 name="fullName"
//                 rules={[
//                   { required: true, message: "Please enter your full name" },
//                 ]}
//               >
//                 <Input
//                   style={{
//                     background: "rgba(255, 255, 255, 0.1)",
//                     color: "#ffffff",
//                   }}
//                   placeholder="Full name..."
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={<span className="text-gray-200 text-[18px]">Age*</span>}
//                 name="age"
//                 rules={[{ required: true, message: "Please enter your age" }]}
//               >
//                 <Input
//                   style={{
//                     background: "rgba(255, 255, 255, 0.1)",
//                     color: "#fff",
//                   }}
//                   placeholder="Age"
//                   type="number"
//                   className="py-10"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={
//                   <span className="text-gray-200 text-[18px]">Gender*</span>
//                 }
//                 name="gender"
//                 rules={[
//                   { required: true, message: "Please select your gender" },
//                 ]}
//               >
//                 <Select
//                   style={{
//                     background: "rgba(255, 255, 255, 0.1)",
//                     color: "#fff",
//                   }}
//                   placeholder="Select Your Gender..."
//                 >
//                   <Option value="male">Male</Option>
//                   <Option value="female">Female</Option>
//                   <Option value="other">Other</Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item
//                 label={
//                   <span className="text-gray-200 text-[18px]">
//                     Write Problem
//                   </span>
//                 }
//                 name="problem"
//               >
//                 <Input.TextArea
//                   style={{
//                     background: "rgba(255, 255, 255, 0.1)",
//                     color: "#fff",
//                   }}
//                   placeholder="Write..."
//                   rows={3}
//                 />
//               </Form.Item>

//               {/* <Button
//                 type="primary"
//                 htmlType="submit"
//                 style={{ background: "#345C8C", borderColor: "#345C8C" }}
//                 className="w-full "
//                 disabled={!selectedDate || !selectedTime}
//               >
//                 Book an Appointment
//               </Button> */}
//               <Link href={'/checkout'}>
//                 <button
//                   disabled={!selectedDate || !selectedTime}
//                   className="w-full py-3 bg-[#01336F] text-[18px] font-normal rounded-lg text-white"
//                 >
//                   Book an Appointment
//                 </button>
//               </Link>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentBooking;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Calendar, Form, Input, Select, Modal, Typography } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import { Dayjs } from "dayjs";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { useAppointmentBookingMutation, useAppointmentDetailsQuery } from "@/redux/features/appointmentSlice";

// const { Option } = Select;
// const { Text } = Typography;

// // ✅ Define Types for Appointment Data & Form Fields
// interface AppointmentData {
//   title: string;
//   image: string;
//   description: string[];
//   price: number;
//   availableTimes: string[];
// }

// interface PatientInfo {
//   fullName: string;
//   age: number;
//   gender: string;
//   problem?: string;
// }

// interface AppointmentBooking {
//   name: string;
//   age: number;
//   gender: 'MALE' | 'FEMALE' | 'OTHER';
//   description: string;
//   appointmentId: string;
//   userId: string;
//   selectedDate: string; // Consider using Date type if you want to handle dates properly
//   selectedTime: string; // Consider using a more structured time type if needed
//   paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
// }

// const AppointmentBooking: React.FC = () => {
//   const params = useParams(); // Get dynamic route params
//   const [appointmentId, setAppointmentId] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [form] = Form.useForm<PatientInfo>();

//   const [appointmentBooking] = useAppointmentBookingMutation()

//   useEffect(() => {
//     if (params?.id) {
//       setAppointmentId(params.id as string);
//     }
//   }, [params]);

//   const { data, isLoading, error } = useAppointmentDetailsQuery(appointmentId, { skip: !appointmentId });

//   if (isLoading) return <p className="text-center py-10 text-white">Loading...</p>;
//   if (error) return <p className="text-center py-10 text-red-500">Failed to load data</p>;

//   const appointment: AppointmentData | undefined = data?.data;

//   const onSelect = (value: Dayjs) => {
//     setSelectedDate(value.format("YYYY-MM-DD"));
//   };

//   const onFinish = (values: PatientInfo) => {
//     Modal.success({
//       title: "Appointment Confirmed ✅",
//       content: (
//         <div>
//           <p>Your appointment is booked for:</p>
//           <p>
//             <strong>Date:</strong> {selectedDate} <br />
//             <strong>Time:</strong> {selectedTime}
//           </p>
//         </div>
//       ),
//     });
//     console.log("Appointment Data:", { ...values, selectedDate, selectedTime });
//   };

//   return (
//     <div className="relative min-h-screen bg-cover bg-center flex flex-col items-center pt-12" style={{ backgroundImage: "url('/images/Appointment.png')" }}>
//       <div className="absolute inset-0 bg-black bg-opacity-70"></div>

//       <div className="relative gap-6 lg:p-6 w-full max-w-6xl z-10">
//         <div>
//           <div className="flex items-center gap-3">
//             <Link href="/appointment">
//               <div className="bg-white p-2 rounded-full cursor-pointer">
//                 <ArrowLeft className="size-6 text-black" />
//               </div>
//             </Link>
//             <h1 className="text-white text-3xl font-bold">{appointment?.title || "Appointment Details"}</h1>
//           </div>
//           <hr className="mb-12 mt-4" />
//         </div>

//         <div className="flex flex-col md:flex-row gap-6 w-full">
//           {/* Calendar & Image Section */}
//           <div className="w-full md:w-1/2 shadow-lg p-6 rounded-lg">
//             <h1 className="text-white text-2xl font-medium mb-4">Select Date*</h1>
//             <Calendar
//               fullscreen={false}
//               onSelect={onSelect}
//               className="border border-gray-400 rounded-md p-2"
//               style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
//               headerRender={({ value, onChange }) => (
//                 <div className="flex justify-between items-center p-2 text-white">
//                   <button onClick={() => onChange(value.clone().subtract(1, "month"))}>
//                     <LeftOutlined />
//                   </button>
//                   <Text className="text-lg font-medium">{value.format("MMMM YYYY")}</Text>
//                   <button onClick={() => onChange(value.clone().add(1, "month"))}>
//                     <RightOutlined />
//                   </button>
//                 </div>
//               )}
//             />

//             {/* Time Selection */}
//             <div className="mt-4">
//               <h1 className="text-gray-200 text-2xl font-medium mb-4 mt-8">Select Time*</h1>
//               <div className="flex flex-wrap justify-between gap-2">
//                 {appointment?.availableTimes?.map((time) => (
//                   <label
//                     key={time}
//                     className={`px-5 py-4 rounded-lg cursor-pointer transition duration-300 border ${
//                       selectedTime === time ? "bg-[#01336F80] text-white" : "border-gray-300 text-gray-300"
//                     }`}
//                   >
//                     <input type="radio" value={time} name="time" className="hidden" onChange={() => setSelectedTime(time)} />
//                     {time}
//                   </label>
//                 ))}
//               </div>
//             </div>

//           </div>

//           {/* Patient Information Section */}
//           <div className="w-full md:w-1/2 shadow-lg p-6 rounded-lg">
//             <h1 className="text-gray-200 text-2xl font-medium mb-4">Patient Information</h1>
//             <Form layout="vertical" form={form} onFinish={onFinish}>
//               <Form.Item label="Full Name*" name="fullName" rules={[{ required: true, message: "Please enter your full name" }]}>
//                 <Input placeholder="Full name..." />
//               </Form.Item>

//               <Form.Item label="Age*" name="age" rules={[{ required: true, message: "Please enter your age" }]}>
//                 <Input type="number" placeholder="Age" />
//               </Form.Item>

//               <Form.Item label="Gender*" name="gender" rules={[{ required: true, message: "Please select your gender" }]}>
//                 <Select placeholder="Select Your Gender...">
//                   <Option value="male">Male</Option>
//                   <Option value="female">Female</Option>
//                   <Option value="other">Other</Option>
//                 </Select>
//               </Form.Item>

//               <Form.Item label="Write Problem" name="problem">
//                 <Input.TextArea placeholder="Write..." rows={3} />
//               </Form.Item>

//               <Link href={`/checkout?appointmentId/${appointmentId}`}>
//                 <button disabled={!selectedDate || !selectedTime} className="w-full py-3 bg-[#01336F] text-[18px] font-normal rounded-lg text-white">
//                   Book an Appointment
//                 </button>
//               </Link>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentBooking;

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, Form, Input, Select, Modal, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Dayjs } from "dayjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  useAppointmentBookingMutation,
  useAppointmentDetailsQuery,
} from "@/redux/features/appointmentSlice";
import {  useUserProfileQuery } from "@/redux/features/userSlice";
import { usePaymentDataMutation } from "@/redux/features/paymentSlice";

const { Option } = Select;
const { Text } = Typography;

interface Booking {
  name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  description: string;
  appointmentId: string;
  userId: string;
  selectedDate: string;
  selectedTime: string;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
}

const AppointmentBooking: React.FC = () => {
  const params = useParams();
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form] = Form.useForm();

  const [appointmentBooking, { isLoading: bookingLoading }] =
    useAppointmentBookingMutation();
  const { data: userProfile, isLoading: userLoading } = useUserProfileQuery();

  useEffect(() => {
    if (params?.id) {
      setAppointmentId(params.id as string);
    }
  }, [params]);

  // const [paymentData] = usePaymentDataQuery()
  const [paymentData] = usePaymentDataMutation()

  const { data, isLoading, error } = useAppointmentDetailsQuery(appointmentId, {
    skip: !appointmentId,
  });

  if (isLoading || userLoading)
    return <p className="text-center py-10 text-white">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load data</p>
    );

  const appointment = data?.data;
  const userId = userProfile?.data?._id;
  console.log(userId,'id')

  const onSelect = (value: Dayjs) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
  };

  const handleBooking = async (values: Booking) => {
    if (!selectedDate || !selectedTime) {
      Modal.error({
        title: "Error",
        content: "Please select a date and time before booking.",
      });
      return;
    }

    try {
      const payload: Booking = {
        ...values,
        age: Number(values.age), // Ensure age is always a number
        appointmentId: appointmentId as string,
        userId: userId as string, // Ensure userId is set
        selectedDate,
        selectedTime,
        paymentStatus: "PENDING",
      };

      const response = await appointmentBooking(payload).unwrap();

      Modal.success({
        title: "Appointment Confirmed ✅",
        content: (
          <div>
            <p>Your appointment is booked for:</p>
            <p>
              <strong>Date:</strong> {selectedDate} <br />
              <strong>Time:</strong> {selectedTime}
            </p>
          </div>
        ),
      });

      console.log("Appointment Booking Success:", response);
    } catch (error) {
      console.error("Booking Error:", error);
      Modal.error({
        title: "Booking Failed ❌",
        content: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center pt-12"
      style={{ backgroundImage: "url('/images/Appointment.png')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative gap-6 lg:p-6 w-full max-w-6xl z-10">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/appointment">
              <div className="bg-white p-2 rounded-full cursor-pointer">
                <ArrowLeft className="size-6 text-black" />
              </div>
            </Link>
            <h1 className="text-white text-3xl font-bold">
              {appointment?.title || "Appointment Details"}
            </h1>
          </div>
          <hr className="mb-12 mt-4" />
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Calendar & Time Selection */}
          <div className="w-full md:w-1/2 shadow-lg p-6 rounded-lg">
            <h1 className="text-white text-2xl font-medium mb-4">
              Select Date*
            </h1>
            <Calendar
              fullscreen={false}
              onSelect={onSelect}
              className="border border-gray-400 rounded-md p-2"
              style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
              headerRender={({ value, onChange }) => (
                <div className="flex justify-between items-center p-2 text-white">
                  <button
                    onClick={() => onChange(value.clone().subtract(1, "month"))}
                  >
                    <LeftOutlined />
                  </button>
                  <Text className="text-lg font-medium">
                    {value.format("MMMM YYYY")}
                  </Text>
                  <button
                    onClick={() => onChange(value.clone().add(1, "month"))}
                  >
                    <RightOutlined />
                  </button>
                </div>
              )}
            />

            {/* Time Selection */}
            <div className="mt-4">
              <h1 className="text-gray-200 text-2xl font-medium mb-4 mt-8">
                Select Time*
              </h1>
              <div className="flex flex-wrap justify-between gap-2">
                {appointment?.availableTimes?.map((time) => (
                  <label
                    key={time}
                    className={`px-5 py-4 rounded-lg cursor-pointer transition duration-300 border ${
                      selectedTime === time
                        ? "bg-[#01336F80] text-white"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      value={time}
                      name="time"
                      className="hidden"
                      onChange={() => setSelectedTime(time)}
                    />
                    {time}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Information Form */}
          <div className="w-full md:w-1/2 shadow-lg p-6 rounded-lg">
            <h1 className="text-gray-200 text-2xl font-medium mb-4">
              Patient Information
            </h1>
            <Form layout="vertical" form={form} onFinish={handleBooking}>
              <Form.Item
                label="Full Name*"
                name="name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
              >
                <Input placeholder="Full name..." />
              </Form.Item>

              <Form.Item
                label="Age*"
                name="age"
                rules={[
                  { required: true, message: "Please enter a valid age" },
                  {
                    validator: (_, value) =>
                      value && Number(value) > 0
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Age must be a positive number")
                          ),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Age"
                  min={1}
                  onChange={(e) =>
                    form.setFieldsValue({ age: Number(e.target.value) })
                  }
                />
              </Form.Item>

              <Form.Item
                label="Gender*"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender" },
                ]}
              >
                <Select placeholder="Select Your Gender...">
                  <Option value="MALE">Male</Option>
                  <Option value="FEMALE">Female</Option>
                  <Option value="OTHER">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Write Problem" name="description">
                <Input.TextArea placeholder="Write..." rows={3} />
              </Form.Item>

              <button
                type="submit"
                disabled={!selectedDate || !selectedTime || bookingLoading}
                className="w-full py-3 bg-[#01336F] text-[18px] font-normal rounded-lg text-white"
              >
                {bookingLoading ? "Booking..." : "Book an Appointment"}
              </button>
              
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;

