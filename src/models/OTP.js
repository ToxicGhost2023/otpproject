import { Schema, model, models } from "mongoose";

const otpSchema = new Schema({
  phoneNumber: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  expiresAt: { type: Date, required: true, index: { expires: "5m" } },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = models.OTP || model("OTP", otpSchema);

export default OTP;
