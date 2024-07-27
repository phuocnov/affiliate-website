import { IBrand } from "@/types";
import axios from "@/utils/axios";

export const getBrandListAPI = async () => {
  try {
    const response = await axios.get("/admin/brand");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBrandAPI = async (data: IBrand) => {
  try {
    const response = await axios.post("/admin/brand", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBrandAPI = async (data: IBrand) => {
  try {
    const response = await axios.put(`/admin/brand`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBrandAPI = async (code: string) => {
  try {
    const response = await axios.delete(`/admin/brand/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
