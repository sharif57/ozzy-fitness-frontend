/* eslint-disable @next/next/no-img-element */
// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useUpdateProfileMutation, useUserProfileQuery } from "@/redux/features/userSlice";

// interface UserProfileData {
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   image: string;
// }

// const ProfileUpdate: React.FC = () => {
// const { data, isLoading, error } = useUserProfileQuery<{ data: UserProfileData }>();

// const [updateProfile] = useUpdateProfileMutation();

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//   });

//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // Set user data once fetched
//   useEffect(() => {
//     if (data?.data) {
//       setFormData({
//         name: data.data.name,
//         phone: data.data.phone || "",
//       });
//       setProfileImage(data.data.image || "/images/user.png");
//     }
//   }, [data]);

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;
//   if (error || !data?.data)
//     return <p className="text-center mt-10 text-red-500">Failed to load profile data.</p>;

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("phone", formData.phone);

//     if (selectedFile) {
//       formDataToSend.append("profileImage", selectedFile);
//     }

//     try {
//       const response = await updateProfile(formDataToSend).unwrap();
//       console.log("Profile updated successfully", response);
//     } catch (error) {
//       console.error("Profile update failed", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
//       {/* Profile Image Upload */}
//       <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
//         <Image
//           src={profileImage}
//           alt="User Profile"
//           width={160}
//           height={160}
//           className="object-cover"
//         />
//         <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-6 h-6 text-white"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15.232 5H8.768A3.768 3.768 0 005 8.768v6.464A3.768 3.768 0 008.768 19h6.464A3.768 3.768 0 0019 15.232V8.768A3.768 3.768 0 0015.232 5zM16.5 11.25l-4.5 4.5m0 0l-4.5-4.5m4.5 4.5V6"
//             />
//           </svg>
//         </label>
//       </div>

//       {/* User Details Form */}
//       <form onSubmit={handleSubmit} className="mt-8 w-full max-w-4xl p-6 rounded-lg">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
//           <input
//             type="email"
//             value={data.data.email}
//             className="w-full px-4 py-2 border rounded-md bg-gray-200 cursor-not-allowed"
//             readOnly
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter your phone number"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Update Button */}
//         <button
//           type="submit"
//           className="bg-[#01336F] text-white px-6 py-2 rounded-lg w-full hover:bg-[#00234B] transition"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileUpdate;

"use client";

import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { PiCameraPlus } from "react-icons/pi";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
} from "@/redux/features/userSlice";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  image: string;
}

const EditMyProfile = () => {
  const navigate = useRouter();
  const {
    data: user,
    isLoading,
    error,
  } = useUserProfileQuery<{ data: UserProfileData }>();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (user?.data) {
      form.setFieldsValue({
        name: user.data.name || "",
        email: user.data.email || "",
        phone: user.data.phone || "",
      });
      setPhoneNumber(user.data.phone || "");
      setProfileImage(
        user.data.image
          ? `http://115.127.156.13:3005/api/v1/${user.data.image}`
          : "https://cdn-icons-png.flaticon.com/128/236/236831.png"
      );
    }
  }, [user, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      const jsonData = JSON.stringify({
        name: values.name,
        phone: phoneNumber,
      });

      formData.append("data", jsonData);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log("Sending formData:", [...formData.entries()]);

      const response = await updateProfile(formData).unwrap();
      console.log("Update response:", response);

      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
      });

      // ✅ Redirect to "/profile" after 3 seconds (giving time for the toast to show)
      setTimeout(() => navigate.push("/profile"), 3000);
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load profile data.
      </p>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh] bg-[#F2F5F7] rounded-2xl p-8 ">
      <ToastContainer />
      <Form
        form={form}
        name="editProfile"
        layout="vertical"
        className="flex flex-col w-full max-w-4xl space-y-6"
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Profile Image Upload Section */}
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="profileImage" className="relative">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-[#222222bb] flex items-center justify-center text-white rounded-full cursor-pointer">
                <PiCameraPlus size={34} />
              </div>
              <img
                src={
                  profileImage
                    ? profileImage
                    : "https://cdn-icons-png.flaticon.com/128/236/236831.png"
                }
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Profile Details Form */}
        <div className="flex flex-col space-y- w-full">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              size="large"
              className="py-2 rounded-lg bg-[#EFFAFF] mt-"
            />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input
              readOnly
              size="large"
              className="py-2 rounded-lg bg-[#EFFAFF] mt-"
            />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <Input
              size="large"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="py-2 rounded-lg bg-[#EFFAFF] mt-"
            />
          </Form.Item>

          <Form.Item className="flex justify-center pt-4">
            {/* <Button
              htmlType="submit"
              loading={isUpdating}
              style={{ backgroundColor: "##01336F", color: "#" }}
              size="large"
              type="primary"
              className="h-16 w-52 flex items-center justify-center text-lg font-medium rounded-md"
            >
              Update
            </Button> */}
            <button 
              className="py-2 px-10 bg-[#01336F] text-[18px] font-normal rounded-lg text-white" 
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditMyProfile;
