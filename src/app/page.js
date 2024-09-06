"use client";

import { formatTime } from "@/utils/timeOute";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [step, setStep] = useState("request");
  const [timeLeft, setTimeLeft] = useState(30);

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
        toast("لطفا شمار موبایل خود را وارد کنید");
        return setStep("request");
      }

      const otps = await res.json();

      if (otps.success) {
        toast((t) => (
          <span className=" flex flex-col">
            <div>
              {" "}
              رمز یکبار مصرف شما: <b>{otps.data}</b>
            </div>

            <button
              className="text-center"
              onClick={() =>
                navigator.clipboard
                  .writeText(otps.data)
                  .then(toast.success("کپی شد👍"))
                  .catch(() => {
                    toast.dismiss(t.id);
                  })
              }
            >
              <span className="bg-green-500 text-white p-[5px]">Copy</span>
            </button>
          </span>
        ));
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast("مشکلی در سرور ایجاد شده");
      setStep("request");
      return;
    }
    setStep("verify");
  };

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
            onChange={(e) =>
              setPhoneNumber(e.target.value ? e.target.value.trim() : "")
            }
            placeholder="Phone number"
          />
          <button
            className="mt-[50px] p-[10px] bg-blue-300 rounded-2xl hover:bg-blue-800 text-[1.3rem] hover:text-white "
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
            onChange={(e) =>
              setOtp(e.target.value ? e.target.value.trim() : "")
            }
            placeholder="OTP"
          />
          <button
            className="mt-[50px] w-full p-[10px] bg-blue-300 rounded-2xl hover:bg-blue-800 text-[1.3rem] hover:text-white "
            onClick={handleVerifyOtp}
          >
            ثبت
          </button>

          <p className="mt-[10px] ">
            زمان باقی‌مانده:
            <span className="text-red-700 text-[1.5rem]">
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>
      )}
      <div>
        <Toaster />
      </div>
    </div>
  );
}
