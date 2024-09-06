import connectDB from "@/utils/connectDB";
import OTP from "@/models/OTP";

import { NextResponse } from "next/server";
import { makeOtp } from "@/utils/otp";

export async function POST(req) {
  try {
    await connectDB();
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json(
        {
          message: "لطفا شماره موبایل خود را وارد کنید",
        },
        { status: 400 }
      );
    }

    const otpCode = makeOtp();

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    const otpShow = await OTP.create({
      phoneNumber,
      otp: otpCode,
      expiresAt,
    });

    console.log(` رمز یبار مصرف شما:${otpCode}`);
    return NextResponse.json({ success: true, status: 201, data: otpCode });
  } catch (error) {
    console.error("مشکلی در سرور رخ داده دوباره امتحان کنید:", error);
    return NextResponse.json(
      { success: false, message: "مشکلی در سرور رخ داده" },
      { status: 500 }
    );
  }
}
