import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pendingQs : []
}

const QsSlice = createSlice(
    {
        name:"qs",
        initialState,
        reducers:{
            updatePendingQs: (state, action) => {
                state.pendingQs = action.payload;
            },
            removeQs: (state, action) => {
                state.pendingQs = state.pendingQs.filter(qs => qs._id !== action.payload);
            }
        }
    }
)

export const { updatePendingQs, removeQs } = QsSlice.actions;
export default QsSlice.reducer;