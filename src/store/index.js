// third-party
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
    reducer: reducers,
    middleware: middleware
});

const { dispatch } = store;

export { store, dispatch };
