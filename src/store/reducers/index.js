// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import authLogin from './authLogin';
import product from './product';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, authLogin, product });

export default reducers;
