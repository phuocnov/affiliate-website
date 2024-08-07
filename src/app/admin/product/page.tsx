'use client';

import Page from "@/app/components/Page";
import { useBrand } from "@/hooks/admin/useBrand";
import { useCategory } from "@/hooks/admin/useCategory";
import useProduct from "@/hooks/admin/useProduct";
import { useHandleModal } from "@/hooks/useModal";
import { ICreateProduct } from "@/types";
import { Box, Button, MenuItem, Modal, Select, Table, TableBody, TableCell, TableHead, TextField, Typography } from "@mui/material";
import { all } from "axios";
import { useEffect, useState } from "react";

const tableHead = [
    {
        id: 'number',
        label: 'No',
    },
    {
        id: 'id',
        label: 'Product ID',
    },
    {
        id: 'shop_id',
        label: 'Shop ID',
    },
    {
        id: 'short_url',
        label: 'URL',
    },
    {
        id: 'price',
        label: 'Price',
    },
    {
        id: 'original_price',
        label: 'Original Price',
    },
    {
        id: 'rating_average',
        label: 'Rating Average',
    },
    {
        id: 'review_count',
        label: 'Review Count',
    },
    {
        id: 'all_time_quantity_sold',
        label: 'All Time Quantity Sold',
    },
    {
        id: 'thumbnail_url',
        label: 'Thumbnail URL',
    },
    {
        id: 'brand',
        label: 'Brand',
    },
    {
        id: 'category',
        label: 'Category',
    },
    {
        id: 'ecommerce_site',
        label: 'Ecommerce Site',
    },
    {
        id: 'affiliate_link',
        label: 'Affiliate Link',
    },
    {
        id: 'visit',
        label: 'Visit',
    },
    {
        id: 'action',
        label: 'Action',
    }
];

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 400,
    backgroudColor: 'white',
    p: 4,
};

export default function CategoryPage() {
    const { handleQuery, products } = useProduct();
    const { open, handleOpen, handleClose, selectedId, isEdit } = useHandleModal();

    useEffect(() => {
        handleQuery({});
    }, []);

    return (
        <Page title="Admin user">
            <Box sx={
                {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    borderBottom: '1px solid #000',
                    width: '100%'
                }
            }>
                <Typography variant="h4" >Product report</Typography>
                <Button onClick={() => { handleOpen() }}>Create</Button>
                <Button onClick={() => { handleQuery }}>Refresh</Button>

            </Box>
            <Box>
                <Table>
                    <TableHead>
                        {tableHead.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align="center"
                            >
                                {headCell.label}
                            </TableCell>
                        ))}
                    </TableHead>
                    {products.length && products.map((product, index) => (
                        <TableBody key={index}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{product.product_id}</TableCell>
                            <TableCell>{product.shop_id}</TableCell>
                            <TableCell>{product.short_url}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.original_price}</TableCell>
                            <TableCell>{product.rating_average}</TableCell>
                            <TableCell>{product.review_count}</TableCell>
                            <TableCell>{product.all_time_quantity_sold}</TableCell>
                            <TableCell>{product.thumbnail_url}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.ecommerce_site}</TableCell>
                            <TableCell>{product.affiliate_link}</TableCell>
                            <TableCell>{product.visit}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleOpen(product.product_id)}>Edit</Button>
                                <Button>Delete</Button>
                            </TableCell>
                        </TableBody>
                    ))}
                </Table>
            </Box>
            <CategoryModal open={open} handleClose={handleClose} selectedId={selectedId} isEdit={isEdit} />
        </Page>
    );
}

const CategoryModal = ({
    open,
    handleClose,
    selectedId,
    isEdit
}: {
    open: boolean;
    handleClose: () => void;
    selectedId: string | null;
    isEdit: boolean;
}) => {
    const [formInput, setFormInput] = useState({
        product_id: '',
        shop_id: '',
        short_url: '',
        price: 0,
        original_price: 0,
        thumbnail_url: '',
        brand: '',
        category: '',
        ecommerce_site: '',
        affiliate_link: '',
        visit: 0,
        all_time_quantity_sold: 0,
        review_count: 0,
        rating_average: 0
    });

    const { handleQuery, products, createProduct, updateProduct } = useProduct();
    const { categories, handleQuery: handleCategoryQuery } = useCategory();
    const { brands, handleQuery: handleBrandQuery } = useBrand();

    useEffect(() => {
        handleCategoryQuery({});
        handleBrandQuery({});
    }, []);

    useEffect(() => {
        const getCategoryInfo = async () => {
            if (isEdit && selectedId) {
                await handleQuery({ product_id: selectedId });
                setFormInput({
                    product_id: products[0].product_id || '',
                    shop_id: products[0].shop_id || '',
                    short_url: products[0].short_url || '',
                    price: products[0].price || 0,
                    original_price: products[0].original_price || 0,
                    thumbnail_url: products[0].thumbnail_url || '',
                    brand: products[0].brand || '',
                    category: products[0].category || '',
                    ecommerce_site: products[0].ecommerce_site || '',
                    affiliate_link: products[0].affiliate_link || '',
                    visit: products[0].visit || 0,
                    all_time_quantity_sold: products[0].all_time_quantity_sold || 0,
                    review_count: products[0].review_count || 0,
                    rating_average: products[0].rating_average || 0
                });
            }
        };
        getCategoryInfo();
    }, [selectedId]);

    const handleInput: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (isEdit) {
            updateProduct(selectedId || '', formInput as ICreateProduct);
        } else {
            createProduct(formInput as ICreateProduct);
        }
        handleClose();
    };

    return <Modal
        open={open}
        onClose={() => {
            handleClose();
            setFormInput({
                product_id: '',
                shop_id: '',
                short_url: '',
                price: 0,
                original_price: 0,
                thumbnail_url: '',
                brand: '',
                category: '',
                ecommerce_site: '',
                affiliate_link: '',
                visit: 0,
                all_time_quantity_sold: 0,
                review_count: 0,
                rating_average: 0
            });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style}
    >
        <Box
            sx={{
                backgroundColor: 'white',
            }}
        >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {isEdit ? 'Edit' : 'Create'} Product
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                }}>
                    <TextField
                        label="Product"
                        name="product_id"
                        value={formInput.product_id}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Shop ID"
                        name="shop_id"
                        value={formInput.shop_id}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Short URL"
                        name="short_url"
                        value={formInput.short_url}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={formInput.price}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Original Price"
                        name="original_price"
                        value={formInput.original_price}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Thumbnail URL"
                        name="thumbnail_url"
                        value={formInput.thumbnail_url}
                        onChange={handleInput}
                    />

                    <Select
                        label="Brand"
                        name="brand"
                        value={formInput.brand}
                        onChange={(evt) => {
                            setFormInput(prevState => ({
                                ...prevState,
                                brand: evt.target.value as string
                            }));
                        }}
                    >
                        {brands.map(brand => (
                            <MenuItem key={brand.code} value={brand.code}>{brand.code}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        label="Category"
                        name="category"
                        value={formInput.category}
                        onChange={(evt) => {
                            setFormInput(prevState => ({
                                ...prevState,
                                category: evt.target.value as string
                            }));
                        }}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.code} value={category.code}>{category.code}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="Ecommerce Site"
                        name="ecommerce_site"
                        value={formInput.ecommerce_site}
                        onChange={handleInput}
                    />
                    <TextField
                        label="Affiliate Link"
                        name="affiliate_link"
                        value={formInput.affiliate_link}
                        onChange={handleInput}
                    />
                    <Button variant="contained" type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    </Modal>
};
