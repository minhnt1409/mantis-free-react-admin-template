import { Link } from 'react-router-dom';

// material-ui
import { Grid, Typography } from '@mui/material';

import MainCard from 'components/MainCard';
import ProductsList from 'pages/components-overview/product/ProductsList';
import AnimateButton from 'components/@extended/AnimateButton';

const ProductView = () => {
    return (
        <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Products</Typography>
                </Grid>
                <Grid>
                    <AnimateButton>
                        <Typography
                            component={Link}
                            to="/product/add"
                            variant="body1"
                            sx={{
                                textDecoration: 'none',
                                color: 'primary.main',
                                border: '2px solid',
                                borderColor: 'primary.main',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                '&:hover': { backgroundColor: 'primary.main', color: 'white', textDecoration: 'none' }
                            }}
                        >
                            Add
                        </Typography>
                    </AnimateButton>
                </Grid>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
                <ProductsList />
            </MainCard>
        </Grid>
    );
};

export default ProductView;
