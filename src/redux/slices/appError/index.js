import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    isError : false,
    errorMsg : ""
};


const appError = createSlice({
    name: "appError",
    initialState: intialState,
    reducers: {
        setError: (state, action) => {
            state.isError = true;
            state.errorMsg = action.payload;
        },
        clearError: (state) => {
            state.isError = false;
            state.errorMsg = "";
        }
    }
});

export const { setError, clearError } = appError.actions;
export default appError.reducer;