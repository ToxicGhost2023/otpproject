import connectDB from "@/utils/connectDB";
import OTP from "@/models/OTP";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { phoneNumber, otpCode } = await req.json();

    if (!phoneNumber || !otpCode) {
      return NextResponse.json(
        {
          message: "لطفا شماره موبایل و OTP را وارد کنید",
        },
        { status: 400 }
      );
    }

    // پیدا کردن OTP مربوط به شماره موبایل
    const otpRecord = await OTP.findOne({ phoneNumber, otps: otpCode });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "OTP نامعتبر است یا منقضی شده" },
        { status: 400 }
      );
    }

    // حذف رکورد OTP پس از تأیید موفقیت‌آمیز
    await otpRecord.remove();

    console.log("OTP verified successfully");
    return NextResponse.json({
      success: true,
      message: "احراز هویت موفقیت‌آمیز بود",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { success: false, message: "مشکلی در سرور رخ داده" },
      { status: 500 }
    );
  }
}
