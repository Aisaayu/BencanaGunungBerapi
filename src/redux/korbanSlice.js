import { createSlice } from "@reduxjs/toolkit";

const korbanSlice = createSlice({
  name: "korban",
  initialState: {
    list: [],
  },
  reducers: {
    setKorbanList: (state, action) => {
      state.list = action.payload;
    },
    addKorban: (state, action) => {
      state.list.push(action.payload);
    },
    updateKorban: (state, action) => {
      const index = state.list.findIndex((korban) => korban.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteKorban: (state, action) => {
      state.list = state.list.filter((korban) => korban.id !== action.payload);
    },
  },
});

export const { setKorbanList, addKorban, updateKorban, deleteKorban } = korbanSlice.actions;
export default korbanSlice.reducer;
