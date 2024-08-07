import useProduct from "@/hooks/admin/useProduct";
import { IProduct } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const ItemCard = ({ item }: {
    item: IProduct
}) => {

    const { updateProduct } = useProduct();

    const handleVisit = () => {
        if (!item.product_id) return;

        updateProduct(item.product_id, {
            ...item,
            visit: item.visit + 1,
        })
        window.open(item.affiliate_link);
    };

    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            border: '1px solid #000',
        }}
    >
        <img src={item.thumbnail_url} alt={item.brand} width={200} height={200} />
        <Box>
            <Typography>{item.product_id}</Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
        }}>
            <Typography>BRAND: </Typography>
            <Typography>{item.brand}</Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
        }}>
            <Typography>CATEGORY: </Typography>
            <Typography>{item.category}</Typography>
        </Box>
        <Box>
            <Typography>PRICE: {item.price}</Typography>
        </Box>
        <Box>
            <Typography>ORIGINAL PRICE: {item.original_price}</Typography>
        </Box>
        <Box>
            <Typography>RATING: {item.rating_average}</Typography>
        </Box>
        <Box>
            <Typography>REVIEW COUNT: {item.review_count}</Typography>
        </Box>
        <Box>
            <Typography>ALL TIME QUANTITY SOLD: {item.all_time_quantity_sold}</Typography>
        </Box>
        <Box>
            <Typography>VISIT: {item.visit}</Typography>
        </Box>

        <Button variant="outlined" onClick={handleVisit}>Visit</Button>
    </Box >
};