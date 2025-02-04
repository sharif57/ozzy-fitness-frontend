"use client";
import React, { useState } from "react";
import { Calendar, Form, Input, Button, Select, Radio, Modal, Typography, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import  { Dayjs } from "dayjs";

const { Option } = Select;
const {  Text } = Typography;

interface AppointmentData {
  fullName: string;
  age: number;
  gender: string;
  problem?: string;
}

const AppointmentBooking: React.FC = () => {
  const [form] = Form.useForm<AppointmentData>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const onSelect = (value: Dayjs) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
  };

  const onFinish = (values: AppointmentData) => {
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
    console.log("Appointment Data:", { ...values, selectedDate, selectedTime });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/Appointment.png')" }}
    >
      {/* Dark overlay for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Wrapper */}
      <div className="relative flex flex-col md:flex-row gap-6 p-6 w-full max-w-6xl z-10">
        
        {/* Calendar Section */}
        <Card
          className="w-full md:w-1/2 shadow-lg p-6 rounded-lg border border-gray-300"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
        >
          <h1 className="text-white text-[32px] font-medium">Select Date*</h1>
          <Calendar
            fullscreen={false}
            onSelect={onSelect}
            className="border border-gray-400 rounded-md p-2"
            style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
            headerRender={({ value, onChange }) => (
              <div className="flex justify-between items-center p-2 text-white">
                <Button
                  icon={<LeftOutlined />}
                  onClick={() => onChange(value.clone().subtract(1, "month"))}
                />
                <Text className="text-lg font-medium">{value.format("MMMM YYYY")}</Text>
                <Button
                  icon={<RightOutlined />}
                  onClick={() => onChange(value.clone().add(1, "month"))}
                />
              </div>
            )}
          />
          <div className="mt-4">
            <h1 className="text-gray-200 font-medium block">Select Time*</h1>
            <Radio.Group
              className="flex flex-wrap gap-2 mt-2"
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {["09:00 AM", "10:00 AM", "01:00 PM", "03:00 PM"].map((time) => (
                <Radio.Button
                  key={time}
                  value={time}
                  style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                  className="px-3 py-1"
                >
                  {time}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </Card>

        {/* Patient Information Section */}
        <Card
          className="w-full md:w-1/3 shadow-lg p-6 rounded-lg border border-gray-300"
          style={{ background: "rgba(255, 255, 255, 0.1)" }}
        >
          <h1 className="text-gray-200">Patient Information</h1>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Full Name*"
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input
                style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                placeholder="Full name..."
              />
            </Form.Item>

            <Form.Item
              label="Age*"
              name="age"
              rules={[{ required: true, message: "Please enter your age" }]}
            >
              <Input
                style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                placeholder="Age"
                type="number"
              />
            </Form.Item>

            <Form.Item
              label="Gender*"
              name="gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Select
                style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                placeholder="Select Your Gender..."
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Write Problem" name="problem">
              <Input.TextArea
                style={{ background: "rgba(255, 255, 255, 0.1)", color: "#fff" }}
                placeholder="Write..."
                rows={3}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{ background: "#1E40AF", borderColor: "#1E40AF" }}
              className="w-full hover:bg-blue-700"
              disabled={!selectedDate || !selectedTime}
            >
              Book an Appointment
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentBooking;