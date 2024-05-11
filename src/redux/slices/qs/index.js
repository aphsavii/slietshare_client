import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pendingQs : [],
    userQs: []
}

const QsSlice = createSlice(
    {
        name:"qs",
        initialState,
        reducers:{
            updatePendingQs: (state, action) => {
                state.pendingQs = action.payload;
            },
            deletePendingQs: (state, action) => {
                state.pendingQs = state.pendingQs.filter(qs => qs._id !== action.payload);
            },
            updateUserQs: (state, action) => {
                state.userQs = action.payload;
            },
            deleteUserQs: (state, action) => {
                state.userQs = state.userQs.filter(qs => qs._id !== action.payload);
            }
        }
    }
)

export const { updatePendingQs, deletePendingQs, updateUserQs, deleteUserQs } = QsSlice.actions;
export default QsSlice.reducer;