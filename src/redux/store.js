import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import appLoadingReducer from './slices/appLoading';
import appErrorReducer from './slices/appError';
import appSuccessReducer from './slices/appSuccess';
import qsSliceReducer from './slices/qs';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: appLoadingReducer,
        error: appErrorReducer,
        success: appSuccessReducer,
        qs: qsSliceReducer
    }
});

export default store;