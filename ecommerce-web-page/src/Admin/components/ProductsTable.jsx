import { Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductsTable = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(store => store.product);

    const handleProductDelete=(productId)=>{
        dispatch(deleteProduct(productId))
    }

    useEffect(() => {
        dispatch(findProducts({
            category: "",
            minPrice: 0,
            maxPrice: 100000,
            minDiscount: 0,
            sort: "price_low",
            pageNumber: 0,
            pageSize: 100 
        }));
    }, [dispatch]);

    return (
        <div className='p-5'>
            <Card className='mt-2'>

                {/* ✅ Card Header should be ONLY TEXT */}
                <CardHeader title="All Products" />

                {/* ✅ Table goes OUTSIDE CardHeader */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>

                        {/* TABLE HEAD */}
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* TABLE BODY */}
                        <TableBody>
                            {products?.map((item) => (
                                <TableRow key={item.id}>

                                    <TableCell>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            width="60"
                                            style={{ borderRadius: "6px" }}
                                        />
                                    </TableCell>

                                    <TableCell>{item.title}</TableCell>

                                    <TableCell>{item.category?.name}</TableCell>

                                    <TableCell>{item.discountedPrice}</TableCell>

                                    <TableCell>{item.quantity}</TableCell>

                                    <TableCell>
                                        <Button onClick={()=>handleProductDelete(item.id)} variant='outlined'>Delete</Button>
                                    </TableCell>

                                </TableRow>
                            ))}

                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No products found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>

            </Card>
        </div>
    );
};

export default ProductsTable;
