import { createSlice } from "@reduxjs/toolkit";
import {setLocalAuth,resetLocalAuth} from "../../../helpers/LocalAuth";

const initialState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            setLocalAuth(action.payload.user, action.payload.accessToken,action.payload.refreshToken);
        },
        loginFailure: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.error = action.payload;
            resetLocalAuth();
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
        }
    }
}); 

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;