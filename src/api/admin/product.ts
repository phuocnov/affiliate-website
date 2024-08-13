import { ICreateProduct, IProduct } from "@/types";
import axios from "@/utils/axios";

export interface IQueryProduct {
  product_id?: string;
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
    const queryParams = Object.keys(query)
      .filter(
        (key): key is keyof IQueryProduct =>
          query[key as keyof IQueryProduct] !== undefined &&
          query[key as keyof IQueryProduct] !== null,
      )
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            query[key as keyof IQueryProduct] as string,
          )}`,
      )
      .join("&");

    const response = await axios.get(`/admin/product?${queryParams}`);
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

export const getTopVisitedProductsAPI = async () => {
  try {
    const response = await axios.get(`/admin/product/top-visited`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const visitProductAPI = async ({
  product_id,
  username,
}: {
  product_id: string;
  username: string;
}) => {
  try {
    const response = await axios.post(`/admin/product/visit`, {
      product_id,
      username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
