import { apiClient } from "../api/client";

// Keep mock mode opt-in so OTP requests are sent to the backend by default.
const MOCK_API = import.meta.env.VITE_MOCK_API === "true";
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const registerProvider = async (fullName, phoneNumber, password) => {
  if (MOCK_API) {
    await delay(800);
    return { success: true, message: "Mock registration successful" };
  }
  return apiClient.post("/auth/register", {
    fullName,
    phoneNumber,
    password,
    accountType: "provider",
    isTermsAccepted: true
  });
};

export const resendOtp = async (phoneNumber) => {
  if (MOCK_API) {
    await delay(800);
    return { success: true, message: "Mock OTP resent" };
  }
  return apiClient.post("/auth/resend-otp", { phoneNumber });
};

export const verifyOtp = async (phoneNumber, otpCode) => {
  if (MOCK_API) {
    await delay(800);
    if (!/^\d{6}$/.test(otpCode)) {
      throw new Error("Invalid OTP code.");
    }
    return { success: true, token: "mock_jwt_token" };
  }
  return apiClient.post("/auth/verify-otp", { phoneNumber, otpCode });
};
