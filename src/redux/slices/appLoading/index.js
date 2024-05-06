import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    appLoading: false
}

const appLoadingSlice = createSlice({
    name: "appLoading",
    initialState,
    reducers: {
        setAppLoading: (state, action) => {
            state.appLoading = action.payload;
        }
    }
});

export const { setAppLoading } = appLoadingSlice.actions;
export default appLoadingSlice.reducer;
