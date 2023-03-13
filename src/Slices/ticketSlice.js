import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ticket",
  initialState: {
    allTickets: [],
    userTickets: [],
  },
  reducers: {
    getTickets: (state) => {},
    setTickets: (state, action) => {
      state.allTickets = action.payload;
    },
    setUserTickets: (state, action) => {
      state.userTickets = action.payload;
    },
  },
});
export default slice.reducer;
export const { getTickets, setTickets, setUserTickets } = slice.actions;
