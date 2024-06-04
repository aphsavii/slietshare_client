import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import appLoadingReducer from './slices/appLoading';
import qsSliceReducer from './slices/qs';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: appLoadingReducer,
        qs: qsSliceReducer
    }
});

export default store;