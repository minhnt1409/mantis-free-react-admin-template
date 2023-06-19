// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const token = localStorage.getItem('token');
const initialState = {
    isLogged: !!token
};

// ==============================|| SLICE - MENU ||============================== //

const authLogin = createSlice({
    name: 'authLogin',
    initialState,
    reducers: {
        setIsLogged(state, action) {
            state.isLogged = action.payload.isLogged;
        }
    }
});

export default authLogin.reducer;

export const { setIsLogged } = authLogin.actions;
