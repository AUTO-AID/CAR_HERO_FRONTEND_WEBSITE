import { apiClient } from "../api/client";

export const registerProvider = (fullName, phoneNumber, password) => {
  return apiClient.post("/auth/register", {
    fullName,
    phoneNumber,
    password,
    accountType: "provider",
    isTermsAccepted: true
  });
};

export const resendOtp = (phoneNumber) => {
  return apiClient.post("/auth/resend-otp", { phoneNumber });
};

export const verifyOtp = (phoneNumber, otpCode) => {
  return apiClient.post("/auth/verify-otp", { phoneNumber, otpCode });
};
