import axios from "@/utils/axios";

export const userLogin = async (data: any) => {
  try {
    const response = await axios.post("/user/auth/signin", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userRegister = async (data: any) => {
  try {
    const response = await axios.post("/user/auth/signup", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/user/auth/current");
    return response.data;
  } catch (error) {
    throw error;
  }
};
