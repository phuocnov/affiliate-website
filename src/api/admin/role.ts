import { IRole } from "@/types";
import axios from "@/utils/axios";

export const getRoleListAPI = async ({
  code,
  desc,
}: {
  code?: string;
  desc?: string;
}) => {
  try {
    const response = await axios.get(
      "/admin/role?code=" +
        (code !== undefined ? code : "") +
        "&desc=" +
        (desc !== undefined ? desc : "")
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRoleAPI = async (data: IRole) => {
  try {
    const response = await axios.post("/admin/role", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoleAPI = async (data: IRole) => {
  try {
    const response = await axios.put(`/admin/role`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRoleAPI = async (code: string) => {
  try {
    const response = await axios.delete(`/admin/role/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
