import axios from 'axios';

// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';

export const fetchProducts = () => {
    const token = localStorage.getItem('token');
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/products', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('api: ', response.data);
            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};

export const fetchProductsSuccess = (products) => {
    return {
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: products
    };
};

export const fetchProductsFailure = (error) => {
    return {
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: error
    };
};
