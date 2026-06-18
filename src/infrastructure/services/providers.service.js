import { apiClient } from "../api/client";

export const applyProvider = (payload) => {
  return apiClient.post("/providers/apply", payload);
};

export const getGovernorates = () => {
  return apiClient.get("/providers/public/governorates");
};

export const getPublicStatistics = () => {
  return apiClient.get("/providers/public/statistics");
};
