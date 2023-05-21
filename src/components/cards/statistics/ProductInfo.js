import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { Box, Grid, Stack, Typography, CardMedia } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const ProductInfo = ({ id, name, description, price, quantity, soldQuantity, images }) => (
    <MainCard contentSX={{ p: 2 }}>
        <Grid container>
            <Grid item xs={12} md={7}>
                <Stack spacing={0.5}>
                    <Link to={`/products/${id}`}>
                        <Typography variant="h4" color="inherit">
                            {name}
                        </Typography>
                    </Link>
                    <Typography variant="h6" color="textSecondary" sx={{ pt: 1 }}>
                        {description}
                    </Typography>
                    <Box>
                        <Typography variant="caption" color="textSecondary">
                            Price: {price}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="textSecondary">
                            Quantity: {quantity}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="textSecondary">
                            Sold Quantity: {soldQuantity}
                        </Typography>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
                <CardMedia component="img" image={`http://localhost:5000/upload_image/${images}`} alt={name} />
            </Grid>
        </Grid>
    </MainCard>
);

ProductInfo.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    soldQuantity: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    images: PropTypes.string
};

export default ProductInfo;
