'use client';
import { getTopVisitedProductsAPI } from "@/api/admin/product";
import { IProduct } from "@/types";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [topVisitedProducts, setTopVisitedProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        const fetchTopVisitedProducts = async () => {
            try {
                const response = await getTopVisitedProductsAPI();
                setTopVisitedProducts(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTopVisitedProducts();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            ADMIN PAGE



            <Box>
                <Typography variant="h1">Top visited product</Typography>
            </Box>
            <Box>
                {topVisitedProducts.map((product) => (
                    <Box
                        key={product.product_id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Box>
                            <Typography>{product.product_id}</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                        }}>
                            <Typography>BRAND: </Typography>
                            <Typography>{product.brand}</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                        }}>
                            <Typography>CATEGORY: </Typography>
                            <Typography>{product.category}</Typography>
                        </Box>
                        <Box>
                            <Typography>PRICE: {product.price}</Typography>
                        </Box>
                        <Box>
                            <Typography>ORIGINAL PRICE: {product.original_price}</Typography>
                        </Box>
                        <Box>
                            <Typography>RATING: {product.rating_average}</Typography>
                        </Box>
                        <Box>
                            <Typography>VISIT: {product.visit}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </main>
    );
}
