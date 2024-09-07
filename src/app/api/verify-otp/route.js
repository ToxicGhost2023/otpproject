import connectDB from "@/utils/connectDB";
import OTP from "@/models/OTP";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await connectDB();
    const { phoneNumber, otp } = await req.json();

    if (!otp) {
      return NextResponse.json(
        {
          message: "لطفا شماره موبایل و OTP را وارد کنید",
        },
        { status: 400 }
      );
    }

    const userOtp = await OTP.findOne({ phoneNumber });

    if (!userOtp) {
      return NextResponse.json(
        { success: false, message: "کاربری با این شماره موبایل یافت نشد" },
        { status: 404 }
      );
    }

    if (userOtp.otp === otp) {
      return NextResponse.json(
        { success: true, message: "OTP با موفقیت تایید شد" },
        { status: 200 },
     
      );
    } else {
      return NextResponse.json(
        { success: false, message: "OTP وارد شده صحیح نیست" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, message: "مشکلی در سرور رخ داده" },
      { status: 500 }
    );
  }
}
