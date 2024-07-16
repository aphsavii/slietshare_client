import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import appLoadingReducer from './slices/appLoading';
import qsSliceReducer from './slices/qs';
import userProfile from './slices/userProfile';
import popupReducer from './slices/popups';

const store = configureStore({
    reducer: {
        auth: authReducer,
        loading: appLoadingReducer,
        qs: qsSliceReducer,
        userProfile: userProfile,
        popup : popupReducer
    }
});

export default store;