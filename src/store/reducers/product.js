// types
import { createSlice } from '@reduxjs/toolkit';

// ==============================|| SLICE - product ||============================== //

const product = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        addProduct(state, action) {
            state.splice(0, state.length, ...action.payload);
        }
    }
});

export default product.reducer;

export const { addProduct } = product.actions;

import axios from 'axios';

export const fetchProducts = () => {
    const token = localStorage.getItem('token');
    return async (dispatch, getState) => {
        console.log('truoc', getState());
        try {
            const response = await axios.get('http://localhost:5000/products', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(product.actions.addProduct(response.data));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
        console.log('sau', getState());
    };
};

export const fetchProductsFailure = (error) => {
    return {
        type: 'FETCH_PRODUCTS_FAILURE',
        payload: error
    };
};
