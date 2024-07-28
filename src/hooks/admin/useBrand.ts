import {
  createBrandAPI,
  deleteBrandAPI,
  getBrandListAPI,
  updateBrandAPI,
} from "@/api/admin/brand";
import { IBrand } from "@/types";
import { useEffect, useState } from "react";

export const useBrand = () => {
  const [users, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const data = await getBrandListAPI();
      setBrands(data);
    } catch (error) {
      setBrands([]);
    }
  };

  const createBrand = async (brand: IBrand) => {
    try {
      createBrandAPI(brand);
      fetchBrands();
    } catch (error) {
      throw error;
    }
  };

  const updateBrand = async (brand: IBrand) => {
    try {
      updateBrandAPI(brand);
      fetchBrands();
    } catch (error) {
      throw error;
    }
  };

  const deleteBrand = async (code: string) => {
    try {
      await deleteBrandAPI(code);
      fetchBrands();
    } catch (error) {
      throw error;
    }
  };

  return { users, fetchBrands, createBrand, updateBrand, deleteBrand };
};
