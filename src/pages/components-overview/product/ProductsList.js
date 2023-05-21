// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { CardMedia, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
// import ProductInfo from 'components/cards/statistics/ProductInfo';
import axios from 'axios';
// import image from '../components-overview/product/image.jpg';
// ==============================|| ORDER TABLE ||============================== //

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        axios
            .get('http://localhost:5000/products', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            });
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Sold Quantity</TableCell>
                        <TableCell>Image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products
                        .slice()
                        .reverse()
                        .map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.price.toLocaleString()},000 VND</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.soldQuantity}</TableCell>
                                <TableCell style={{ width: '100px', height: '100px' }}>
                                    <CardMedia component="img" src={`http://localhost:5000/upload_image/${item.id}`} alt={item.name} />
                                </TableCell>
                                <TableCell>
                                    <Link to={`/product/${item.id}`}>Thông tin chi tiết</Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        onClick={async () => {
                                            const confirmDelete = window.confirm('Bạn chắc chắn muốn xóa sản phẩm chứ?');
                                            if (confirmDelete) {
                                                try {
                                                    await axios.delete(`http://localhost:5000/product/${item.id}`, {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`
                                                        }
                                                    });
                                                    const response = await axios.get('http://localhost:5000/products', {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`
                                                        }
                                                    });
                                                    setProducts(response.data);
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }
                                        }}
                                    >
                                        Xóa
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
