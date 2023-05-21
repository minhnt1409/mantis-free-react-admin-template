import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// material-ui
import { Button, Box, Grid, InputLabel, OutlinedInput, Stack, CardMedia } from '@mui/material';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import AuthBackground from 'assets/images/auth/AuthBackground';

// assets
import { Container } from '../../../../node_modules/@mui/material/index';

// ============================|| FIREBASE - LOGIN ||============================ //

const ProductEdit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');
    const { id } = useParams();
    const token = localStorage.getItem('token');

    const formData = new FormData();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        if (image) {
            formData.append('image', image);
        }
        console.log(formData.get('description'));
        try {
            const response = await axios.put(`http://localhost:5000/product/update/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            window.location.href = '/free/product';
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        axios
            .get(`http://localhost:5000/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                console.log(token);
                const { name, description, price, quantity, images } = response.data;
                setName(name);
                setDescription(description);
                setPrice(price);
                setQuantity(quantity);
                setImage(images);
            });
    }, []);
    return (
        <Box sx={{ minHeight: '100vh', margin: '0 auto' }}>
            <AuthBackground />
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
                }}
                xs={5}
            >
                <Grid sx={{ width: '50%' }}>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="nameProduct">Tên sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="nameProduct"
                                            type="text"
                                            value={name}
                                            onChange={handleNameChange}
                                            name="name"
                                            placeholder="Enter product name"
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="description">Mô tả sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="description"
                                            type={'text'}
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            name="description"
                                            placeholder="Enter description"
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="image">Thay đổi ảnh sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="image"
                                            type={'file'}
                                            onChange={handleImageChange}
                                            name="image"
                                            placeholder="Enter image"
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="price">Giá sản phẩm (Nghìn VNĐ)</InputLabel>
                                        <OutlinedInput
                                            id="price"
                                            type={'number'}
                                            value={price}
                                            onChange={handlePriceChange}
                                            name="price"
                                            placeholder="Enter price"
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="quantity">Số lượng sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="quantity"
                                            type={'Number'}
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            name="quantity"
                                            placeholder="Enter quantity"
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    src={`http://localhost:5000/upload_image/${id}`}
                                    alt={name}
                                    onChange={handleImageChange}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <br></br>
                        <Grid item xs={16} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid container spacing={30} direction="row">
                                <Grid item xs={6}>
                                    <AnimateButton>
                                        <Button
                                            size="large"
                                            type="button"
                                            sx={{ margin: '0 auto' }}
                                            variant="contained"
                                            color="primary"
                                            onClick={handleUpdate}
                                        >
                                            Update
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProductEdit;
