import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    name: null,
    email: null
  },
  reducers: {
    login: (state) => {
      state.id = 1;
    }
  }
});

export const { login} = userSlice.actions;

export default userSlice.reducer;