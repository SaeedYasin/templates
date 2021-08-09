import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "count",
  initialState: { value: 0 },
  reducers: {
    INC_COUNT: (state, action) => {
      state.value += 1;
    },
    DEC_COUNT: (state, action) => {
      state.value -= 1;
    },
  },
});

export const getCount = (state) => state.entities.count.present.value;
export const getPastCounts = (state) => state.entities.count.past;
export const getFutureCounts = (state) => state.entities.count.future;
export const { INC_COUNT, DEC_COUNT } = slice.actions;
export default slice.reducer;
