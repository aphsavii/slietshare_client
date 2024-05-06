import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import appLoadingReducer from './slices/appLoading';
import appErrorReducer from './slices/appError';
import appSuccessReducer from './slices/appSuccess';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: appLoadingReducer,
        error: appErrorReducer,
        success: appSuccessReducer,
    }
});

export default store;