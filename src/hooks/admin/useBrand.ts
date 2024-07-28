import {
  createBrandAPI,
  deleteBrandAPI,
  getBrandListAPI,
  updateBrandAPI,
} from "@/api/admin/brand";
import { IBrand } from "@/types";
import { useEffect, useState } from "react";

export const useBrand = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    handleQuery({});
  }, []);

  const handleQuery = async (query: { code?: string }) => {
    try {
      const data = await getBrandListAPI(query);
      setBrands(data);
    } catch (error) {
      setBrands([]);
    }
  };

  const createBrand = async (brand: IBrand) => {
    try {
      await createBrandAPI(brand);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const updateBrand = async (brand: IBrand) => {
    try {
      await updateBrandAPI(brand);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const deleteBrand = async (code: string) => {
    try {
      await deleteBrandAPI(code);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  return { brands, handleQuery, createBrand, updateBrand, deleteBrand };
};
