import { Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductTableView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(store => store.product);

    useEffect(() => {
        const data = {
            category: "",
            minPrice: 0,
            maxPrice: 100000,
            minDiscount: 0,
            sort: 'price_low',
            pageNumber: 0,
            pageSize: 5,
        };
        dispatch(findProducts(data));
    }, [dispatch]);

    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId));
    };

    return (
        <div className='p-5'>
            <Card className='mt-2'>
                <CardHeader
                    title="All Products"
                    action={
                        <Button onClick={() => navigate('/admin/products')}>
                            View All
                        </Button>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
                        <TableBody>
                            {products?.slice(0, 5).map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <img src={item.imageUrl} alt='' className='w-10 h-10' />
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {item.title}
                                    </TableCell>
                                    <TableCell>{item.category?.name}</TableCell>
                                    <TableCell>{item.discountedPrice}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleProductDelete(item.id)}
                                            variant='outlined'
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default ProductTableView;
