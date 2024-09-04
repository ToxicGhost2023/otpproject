// lib/otp.js
import { authenticator } from "otplib";
import sendSms from "./sendSms";

const generateOtp = (secret) => {
  return authenticator.generate(secret);
};

const verifyOtp = (token, secret) => {
  return authenticator.check(token, secret);
};

const sendOtpToUser = async (phoneNumber) => {
  const secret = "YOUR_SECRET_KEY"; // می‌توانید این را برای هر کاربر به صورت منحصر به فرد تولید کنید
  const otp = generateOtp(secret);
  await sendSms(phoneNumber, `Your OTP code is: ${otp}`);
  return otp; // برای تست یا ذخیره‌سازی در سرور
};

export { generateOtp, verifyOtp, sendOtpToUser };
