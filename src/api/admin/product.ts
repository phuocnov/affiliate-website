import { ICreateProduct, IProduct } from "@/types";
import axios from "@/utils/axios";

export interface IQueryProduct {
  product_id?: string;
  name?: string;
  short_description?: string;
  long_description?: string;
  thumbnail_url?: string;
  brand?: string;
  category?: string;
  ecommerce_site?: string;
  affiliate_link?: string;
  visit?: number;
}

export const getProductsAPI = async (query: IQueryProduct) => {
  try {
    const response = await axios.get("/admin/product", { data: query });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProductAPI = async (data: ICreateProduct) => {
  try {
    const response = await axios.post("/admin/product", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductAPI = async (product_id: string, data: IProduct) => {
  try {
    const response = await axios.put(`/admin/product/${product_id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductAPI = async (product_id: string) => {
  try {
    const response = await axios.delete(`/admin/product/${product_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};