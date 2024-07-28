import { IShop, ICreateShop } from "@/types";
import axios from "@/utils/axios";

export interface IQueryShop {
  shop_id?: string;
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

export const getShopsAPI = async (query: IQueryShop) => {
  try {
    const response = await axios.get("/admin/shop", { data: query });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createShopAPI = async (data: ICreateShop) => {
  try {
    const response = await axios.post("/admin/shop", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateShopAPI = async (shop_id: string, data: IShop) => {
  try {
    const response = await axios.put(`/admin/shop/${shop_id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteShopAPI = async (shop_id: string) => {
  try {
    const response = await axios.delete(`/admin/shop/${shop_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
