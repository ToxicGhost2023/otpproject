import connectDB from "@/utils/connectDB";
import OTP from "@/models/OTP";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { phoneNumber, otp } = req.json();

    const isVAlide = await OTP.findOne({ phoneNumber, otp });

    if (isVAlide) {
      await OTP.deleteOne({ phoneNumber, otp });
      return NextResponse.json({ success: true, status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: "رمز یکبار مصرف منقضی شده" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    return NextResponse.json(
      { success: false, message: "مشکلی در سرور ایجاد شده" },
      { status: 500 }
    );
  }
}
