"use client";

import { formatTime } from "@/utils/timeOute";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function VerifyOtp({ phoneNumber, setPhoneNumber, step, setStep }) {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  const router = useRouter();

  useEffect(() => {
    let timerId;
    if (step === "verify" && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast("زمان رمز یبار مصرف شما به پایان رسید ");
      setStep("request");
      setPhoneNumber("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [phoneNumber, step, timeLeft]);

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phoneNumber, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Request failed with status " + res.status);
      }

      const data = await res.json();

      if (data.success) {
        router.push("/home");
        toast.success("احراز هویت با موفقیت انجام شد");
        setStep("request");
        setTimeLeft(30);
      } else {
        toast.error("OTP نامعتبر است");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("خطا در تایید OTP. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <>
      {step === "verify" && (
        <div className="flex flex-col w-full max-w-md h-auto p-8 rounded-xl shadow-lg bg-white">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            رمز را وارد کنید
          </h1>

          <input
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value ? e.target.value.trim() : "")
            }
            placeholder="OTP"
          />

          <p className="mt-4 text-gray-600">
            زمان باقی‌مانده:
            <span className="text-red-700 text-2xl font-semibold ml-2">
              {formatTime(timeLeft)}
            </span>
          </p>

          <button
            className="mt-8 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            onClick={handleVerifyOtp}
          >
            ثبت
          </button>
        </div>
      )}
    </>
  );
}

export default VerifyOtp;
