import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    isSuccess : false,
    successMsg : ""
};

const appSuccess = createSlice({
    name: "appSuccess",
    initialState: intialState,
    reducers: {
        setSuccess: (state, action) => {
            state.isSuccess = true;
            state.successMsg = action.payload;
        },
        clearSuccess: (state) => {
            state.isSuccess = false;
            state.successMsg = "";
        }
    }
});

export const { setSuccess, clearSuccess } = appSuccess.actions;
export default appSuccess.reducer;