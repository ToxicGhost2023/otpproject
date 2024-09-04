import axios from "axios";

const sendSms = async (phoneNumber, message) => {
  try {
    const response = await axios.post("API_ENDPOINT", {
      phoneNumber,
      message,
      apiKey: "YOUR_API_KEY",
    });
    return response.data;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw new Error("Failed to send SMS");
  }
};

export default sendSms;
