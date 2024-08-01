import { IRolePermission } from "@/types";
import axios from "@/utils/axios";

export const getRolePermissionListAPI = async (query: IRolePermission) => {
  try {
    const queryParams = Object.keys(query)
      .filter(
        (key): key is keyof IRolePermission =>
          query[key as keyof IRolePermission] !== undefined &&
          query[key as keyof IRolePermission] !== null
      )
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            query[key as keyof IRolePermission] as string
          )}`
      )
      .join("&");

    const response = await axios.get(`/admin/role-permission?${queryParams}`);
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
