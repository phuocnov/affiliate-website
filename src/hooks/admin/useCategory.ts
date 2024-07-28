import {
  createCategoryAPI,
  deleteCategoryAPI,
  getCategoryListAPI,
  updateCategoryAPI,
} from "@/api/admin/category";
import { ICategory } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const createCategory = async (brand: ICategory) => {
    try {
      createCategoryAPI(brand);
      handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const updateCategory = async (brand: ICategory) => {
    try {
      updateCategoryAPI(brand);
      handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const deleteCategory = async (code: string) => {
    try {
      await deleteCategoryAPI(code);
      handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const handleQuery = useCallback(
    async ({ code, desc }: { code?: string; desc?: string }) => {
      try {
        const res = await getCategoryListAPI({ code, desc });
        if (Object.keys(res).length === 0) {
          setCategories([]);
        } else {
          setCategories(res);
        }
        setCategories(res);
      } catch (error) {
        throw error;
      }
    },
    [createCategory, updateCategory, deleteCategory]
  );

  return {
    categories,
    handleQuery,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
