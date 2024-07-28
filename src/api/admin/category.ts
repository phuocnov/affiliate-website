import { ICategory } from "@/types";
import axios from "@/utils/axios";

export const getCategoryListAPI = async ({
  code,
  desc,
}: {
  code?: string;
  desc?: string;
}) => {
  try {
    const response = await axios.get(
      "/admin/category?code=" +
        (code !== undefined ? code : "") +
        "&desc=" +
        (desc !== undefined ? desc : "")
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategoryAPI = async (data: ICategory) => {
  try {
    const response = await axios.post("/admin/category", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategoryAPI = async (data: ICategory) => {
  try {
    const response = await axios.put(`/admin/category?code=${data.code}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategoryAPI = async (code: string) => {
  try {
    const response = await axios.delete(`/admin/category/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
