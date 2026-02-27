import api from "./axiosConfig";

// Auth endpoints
export const signupUser = (data) =>
  api.post("/api/auth/signup", data);

export const loginUser = (data) =>
  api.post("/api/auth/login", data);