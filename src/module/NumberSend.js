"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import VerifyOtp from "./VerifyOtp";

function NumberSend({ setStep, step }) {
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleSendNumber = async () => {
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

      const data = await res.json();

      if (data.success) {
        toast((t) => (
          <span className=" flex flex-col">
            <div>
              رمز یکبار مصرف شما: <b>{data.data}</b>
            </div>

            <button
              className="text-center"
              onClick={() =>
                navigator.clipboard
                  .writeText(data.data)
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

  return (
    <div className="flex flex-col border border-blue-700  ">
      <h1 className="text-xl font-semibold text-gray-700 mt-[10px] mb-[10px] p-[10px] text-center">
        لطفا شماره خود را وارد کنید
      </h1>
      <input
        className="border border-gray-300 p-2 m-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        type="text"
        value={phoneNumber}
        onChange={(e) =>
          setPhoneNumber(e.target.value ? e.target.value.trim() : "")
        }
        placeholder="Phone number"
      />
      {step === "verify" ? (
        <div className="mt-6">
          <VerifyOtp
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            step={step}
            setStep={setStep}
          />
        </div>
      ) : (
        <button
          className="m-[50px]  bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleSendNumber}
        >
          دریافت رمز یبار مصرف
        </button>
      )}
    </div>
  );
}

export default NumberSend;
