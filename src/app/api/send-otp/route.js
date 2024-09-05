import connectDB from "@/utils/connectDB";
import OTP from "@/models/OTP";
import { makeOtp } from "@/utils/otp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { phoneNumber } = await req.json();
    const otp = makeOtp();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
    await OTP.create({
      phoneNumber,
      otp,
      expiresAt,
    });
    console.log(` رمز یبار مصرف شما:${otp}`);
    return NextResponse.json({ success: true, status: 201, data: otp });
  } catch (error) {
    console.error("مشکلی در سرور رخ داده دوباره امتحان کنید:", error);
    return NextResponse.json(
      { success: false, message: "مشکلی در سرور رخ داده" },
      { status: 500 }
    );
  }
}
