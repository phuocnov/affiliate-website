import axios from "@/utils/axios";

export const getVisitsAPI = async () => {
  try {
    const response = await axios.get("/user/visit");
    return response.data;
  } catch (error) {
    throw error;
  }
};
