import axios from "@/utils/axios";

export const getUserListAPI = async ({ username }: { username?: string }) => {
  try {
    const response = await axios.get(
      `/admin/user?${new URLSearchParams({ username: username || "" })}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserAPI = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post("/admin/user", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserAPI = async (data: {
  username: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.put(`/admin/user`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserAPI = async (username: string) => {
  try {
    const response = await axios.delete(`/admin/user/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
