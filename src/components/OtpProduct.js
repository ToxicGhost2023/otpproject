"use client";

import NumberSend from "@/module/NumberSend";

import { useState } from "react";
import { Toaster } from "react-hot-toast";

function OtpProduct() {
  const [step, setStep] = useState("request");

  return (
    <div className="grid place-items-center  mt-[250px]">
      <NumberSend setStep={setStep} step={step} />

      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default OtpProduct;
