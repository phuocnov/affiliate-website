'use client';
import useProduct from "@/hooks/admin/useProduct";
import { ItemCard } from "./components/ItemCard";
import { Box, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCategory } from "@/hooks/admin/useCategory";
import { useBrand } from "@/hooks/admin/useBrand";


export default function Home() {
  const { products, handleQuery } = useProduct();
  const { categories, handleQuery: CategoryHandleQuery } = useCategory();
  const { brands, handleQuery: BrandHandleQuery } = useBrand();
  const [searchParams, setSearchParams] = useState({
    name: "",
    brand: "",
    category: "",
  });

  useEffect(() => {
    handleQuery({
      product_id: searchParams.name,
      brand: searchParams.brand,
      category: searchParams.category,
    });
  }, [searchParams]);

  useEffect(() => {
    CategoryHandleQuery({});
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Product</h1>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
      }}>
        <TextField placeholder="Search" value={searchParams.name} onChange={
          (e) => setSearchParams((prev) => ({ ...prev, name: e.target.value }))
        } />
        <Typography>Category</Typography>
        <Select sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
          value={searchParams.category}
          onChange={(e) => setSearchParams((prev) => ({ ...prev, category: e.target.value as string }))}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category.code}>{category.code}</MenuItem>
          ))}
        </Select>

        <Typography>Brand</Typography>
        <Select sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
          value={searchParams.brand}
          onChange={(e) => setSearchParams((prev) => ({ ...prev, brand: e.target.value as string }))}
        >
          <MenuItem value="">All</MenuItem>
          {brands.map((brands) => (
            <MenuItem value={brands.code}>{brands.code}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'red',
      }}>
        <img src="https://cf.shopee.vn/file/sg-11134258-7rdvj-lyc2r3xi52767f_xxhdpi" />
        <img src="https://cf.shopee.vn/file/sg-11134258-7rdvg-lybxra0hz1d65c_xhdpi" />
        <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lyc387bdljyl08_xxhdpi" />
      </Box>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ItemCard item={product} />
        ))}
      </div>
    </main>
  );
}
