import { IPermission } from "@/types";
import axios from "@/utils/axios";

export const getPermissionListAPI = async ({
  code,
  desc,
}: {
  code?: string;
  desc?: string;
}) => {
  try {
    const response = await axios.get(
      "/admin/permission?code=" +
        (code !== undefined ? code : "") +
        "&desc=" +
        (desc !== undefined ? desc : "")
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPermissionAPI = async (data: IPermission) => {
  try {
    const response = await axios.post("/admin/permission", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePermissionAPI = async (data: IPermission) => {
  try {
    const response = await axios.put(`/admin/permission`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePermissionAPI = async (code: string) => {
  try {
    const response = await axios.delete(`/admin/permission/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
