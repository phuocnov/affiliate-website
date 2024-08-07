import {
  createProductAPI,
  deleteProductAPI,
  getProductsAPI,
  IQueryProduct,
  updateProductAPI,
} from "@/api/admin/product";
import { IProduct } from "@/types";
import { useEffect, useState } from "react";

const useProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    handleQuery({});
  }, []);

  const handleQuery = async (query: IQueryProduct) => {
    try {
      const data = await getProductsAPI(query);
      setProducts(data);
    } catch (error) {
      setProducts([]);
    }
  };

  const createProduct = async (product: IProduct) => {
    try {
      await createProductAPI(product);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (product_id: string, product: IProduct) => {
    try {
      await updateProductAPI(product_id, product);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (product_id: string) => {
    try {
      await deleteProductAPI(product_id);
      await handleQuery({});
    } catch (error) {
      throw error;
    }
  };

  return { products, handleQuery, createProduct, deleteProduct, updateProduct };
};

export default useProduct;
