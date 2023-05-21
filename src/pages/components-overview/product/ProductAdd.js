import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, Box, Grid, InputLabel, OutlinedInput, Stack, FormHelperText } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import AuthBackground from 'assets/images/auth/AuthBackground';

// assets
import { Container } from '../../../../node_modules/@mui/material/index';

// ============================|| FIREBASE - LOGIN ||============================ //

const ProductAdd = () => {
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    return (
        <Box sx={{ minHeight: '100vh', margin: '0 auto' }}>
            <AuthBackground />
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: { xs: 'calc(50vh - 134px)', md: 'calc(50vh - 112px)' },
                    width: '50%'
                }}
                xs={5}
            >
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Name is required'),
                        description: Yup.string().required('Description is required'),
                        price: Yup.number().positive().required('Price is required'),
                        quantity: Yup.number().positive().required('Quantity is required')
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const formData = new FormData();
                        formData.append('name', values.name);
                        formData.append('description', values.description);
                        formData.append('price', values.price);
                        formData.append('quantity', values.quantity);
                        formData.append('image', image);
                        try {
                            await axios.post('http://localhost:5000/add_product', formData, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            navigate('/product');
                        } catch (error) {
                            console.error(error);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="nameProduct">Tên sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="nameProduct"
                                            type="text"
                                            value={values.name}
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập Tên sản phẩm"
                                            fullWidth
                                            error={Boolean(touched.name && errors.name)}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-name-product">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="description">Mô tả sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="description"
                                            type="text"
                                            value={values.description}
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập Mô tả sản phẩm"
                                            fullWidth
                                            error={Boolean(touched.description && errors.description)}
                                        />
                                        {touched.description && errors.description && (
                                            <FormHelperText error id="standard-weight-helper-text-description-product">
                                                {errors.description}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="image">Ảnh sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="image"
                                            type="file"
                                            value={values.image}
                                            name="image"
                                            onBlur={handleBlur}
                                            onChange={handleImageChange}
                                            placeholder="Enter image"
                                            fullWidth
                                            error={Boolean(touched.image && errors.image)}
                                        />
                                        {touched.image && errors.image && (
                                            <FormHelperText error id="standard-weight-helper-text-image-product">
                                                {errors.image}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="price">Giá sản phẩm (Nghìn VNĐ)</InputLabel>
                                        <OutlinedInput
                                            id="price"
                                            type="number"
                                            value={values.price}
                                            name="price"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập Giá sản phẩm"
                                            fullWidth
                                            error={Boolean(touched.price && errors.price)}
                                        />
                                        {touched.price && errors.price && (
                                            <FormHelperText error id="standard-weight-helper-text-price-product">
                                                {errors.price}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="quantity">Số lượng sản phẩm</InputLabel>
                                        <OutlinedInput
                                            id="quantity"
                                            type="number"
                                            value={values.quantity}
                                            name="quantity"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Nhập Số lượng sản phẩm"
                                            fullWidth
                                            error={Boolean(touched.quantity && errors.quantity)}
                                        />
                                        {touched.quantity && errors.quantity && (
                                            <FormHelperText error id="standard-weight-helper-text-quantity-product">
                                                {errors.quantity}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Add
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Container>
        </Box>
    );
};

export default ProductAdd;
