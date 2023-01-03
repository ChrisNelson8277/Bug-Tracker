import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ticket",
  initialState: {
    allTickets: [],
  },
  reducers: {
    getTickets: (state) => {},
    setTickets: (state, action) => {
      state.allTickets = action.payload;
    },
  },
});
export default slice.reducer;
export const { getTickets, setTickets } = slice.actions;
