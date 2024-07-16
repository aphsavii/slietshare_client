import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createPost: false,
};

const popupsSlice = createSlice({
    name: "popups",
    initialState,
    reducers: {
        toggleCreatePost: (state) => {
            state.createPost = !state.createPost
        }
    },
});

export const { toggleCreatePost } = popupsSlice.actions;

export default popupsSlice.reducer;