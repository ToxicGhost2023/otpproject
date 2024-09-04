import { Schema, model, models } from "mongoose";

const otpSchema = new Schema({
  phoneNumber: {
    type: String,
    require: true,
  },
  otpCode: {
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
const OTP = models.OTP || model("OTP", otpSchema);

export default OTP;
