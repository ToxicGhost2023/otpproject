// pages/api/send-otp.js
import { sendOtpToUser } from "../../lib/otp";

export default async function post(req, res) {
  const { phoneNumber } = req.body;

  try {
    await sendOtpToUser(phoneNumber);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
}
