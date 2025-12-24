import { registerAPI, loginAPI, verifyUserAPI } from "../api/auth.api";

export async function registerUser(data) {
  try {
    const response = await registerAPI(data);
    return response.data.user;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Registration failed";

    throw new Error(message);
  }
}

export async function loginUser(data) {
  try {
    const response = await loginAPI(data);
    return response.data.user;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Invalid mobile number or password";

    throw new Error(message);
  }
}

export async function verifyUser() {
  try {
    const response = await verifyUserAPI();
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
