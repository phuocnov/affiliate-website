import { IRolePermission } from "@/types";
import axios from "@/utils/axios";

export const getRolePermissionListAPI = async () => {
  try {
    const response = await axios.get("/admin/role-permission");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRolePermissionAPI = async (data: IRolePermission) => {
  try {
    const response = await axios.post("/admin/role-permission", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRolePermissionAPI = async (data: IRolePermission) => {
  try {
    const response = await axios.put(`/admin/role-permission`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRolePermissionAPI = async (code: string) => {
  try {
    const response = await axios.delete(`/admin/role-permission/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
