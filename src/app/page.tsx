"use client";
import useProduct from "@/hooks/admin/useProduct";
import { ItemCard } from "./components/ItemCard";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCategory } from "@/hooks/admin/useCategory";
import { useBrand } from "@/hooks/admin/useBrand";
import { colors } from "@/utils/color";

export default function Home() {
  const { products, handleQuery } = useProduct();
  const { categories, handleQuery: CategoryHandleQuery } = useCategory();
  const { brands } = useBrand();
  const [searchParams, setSearchParams] = useState({
    name: "",
    brand: "All",
    category: "All",
  });

  useEffect(() => {
    handleQuery({
      product_id: searchParams.name,
      brand: searchParams.brand === "All" ? undefined : searchParams.brand,
      category:
        searchParams.category === "All" ? undefined : searchParams.category,
    });
  }, [searchParams]);

  useEffect(() => {
    CategoryHandleQuery({});
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "red",
          width: "100%",
        }}
      >
        <img src="https://cf.shopee.vn/file/sg-11134258-7rdvj-lyc2r3xi52767f_xxhdpi" />
        <Box>
          <img src="https://cf.shopee.vn/file/sg-11134258-7rdvg-lybxra0hz1d65c_xhdpi" />
          <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lyc387bdljyl08_xxhdpi" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
          backgroundColor: colors.orange[500],
          width: "100%",
          padding: "20px",
        }}
      >
        <Typography>Filter</Typography>
        <TextField
          placeholder="Tim kiem san pham"
          value={searchParams.name}
          onChange={(e) =>
            setSearchParams((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Typography>Category</Typography>
        <Select
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
          value={searchParams.category}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              category: e.target.value as string,
            }))
          }
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.code} value={category.code}>
              {category.code}
            </MenuItem>
          ))}
        </Select>

        <Typography>Brand</Typography>
        <Select
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
          value={searchParams.brand}
          onChange={(e) =>
            setSearchParams((prev) => ({
              ...prev,
              brand: e.target.value as string,
            }))
          }
        >
          <MenuItem value="All">All</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand.code} value={brand.code}>
              {brand.code}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.orange[500],
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category.code}
            variant="outlined"
            onClick={() => {
              setSearchParams({
                ...searchParams,
                category: category.code,
              });
            }}
          >
            {category.code}
          </Button>
        ))}
      </Box>

      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ItemCard item={product} />
        ))}
      </div>
    </main>
  );
}
