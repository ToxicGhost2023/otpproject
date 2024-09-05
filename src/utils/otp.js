function makeOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

export { makeOtp };
