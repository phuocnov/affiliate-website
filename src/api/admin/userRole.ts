import { IUserRole } from "@/types";
import axios from "@/utils/axios";

export const getUserRoleListAPI = async () => {
  try {
    const response = await axios.get("/admin/user-role");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserRoleAPI = async (data: IUserRole) => {
  try {
    const response = await axios.post("/admin/user-role", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserRoleAPI = async (data: IUserRole) => {
  try {
    const response = await axios.put(`/admin/user-role`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserRoleAPI = async (code: string) => {
  try {
    const response = await axios.delete(`/admin/user-role/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
