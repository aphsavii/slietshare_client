import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
    userData :{},
    dialog: null,
};

const UserProfileSlice = createSlice(
    {
        name:"userProfile",
        initialState,
        reducers:{
            updateUserData: (state, action) => {
                state.userData = action.payload;
            },
            setDialog: (state, action) => {
                state.dialog = action.payload;
            }
        }
    }
)

export const { updateUserData, setDialog } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;