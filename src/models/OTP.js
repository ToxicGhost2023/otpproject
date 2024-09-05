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
  createdAt: {
    type: Date,
    default: Date.now(),
    expiers: 30,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = models.OTP || model("OTP", otpSchema);

export default OTP;
