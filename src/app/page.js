"use client";

import { useState } from "react";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("request");

  const handleSendOtp = async () => {
    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert(`رمز یکبار مصرف شما:  ${data.data}`);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred while sending OTP.");
    }
    setStep("verify");
  };

  const handleVerifyOtp = async () => {
    const res = await fetch("/api/verify-otp", {
      body: JSON.stringify({ phoneNumber, otp }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.success) {
      alert("Authenticated successfully");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="grid place-items-center mt-[250px]">
      {step === "request" && (
        <div className="flex flex-col border border-blue-600 p-[20px] rounded-xl">
          <h1 className="text-[1.5rem] my-[20px]">
            لطفا شماره خود را وارد کنید
          </h1>
          <input
            className="border border-blue-950 p-[10px]"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number"
          />
          <button
            className="mt-[50px] bg-blue-300 rounded-2xl hover:bg-blue-800 text-[1.3rem] hover:text-white "
            onClick={handleSendOtp}
          >
            دریافت رمز یبار مصرف
          </button>
        </div>
      )}
      {step === "verify" && (
        <div className="grid place-items-center border border-blue-600 p-[20px] rounded-xl">
          <h1>رمز را وارد کنید</h1>
          <input
            className="border border-blue-950 p-[10px]"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          />
          <button
            className="mt-[50px] bg-blue-300 rounded-2xl hover:bg-blue-800 text-[1.3rem] hover:text-white "
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}
