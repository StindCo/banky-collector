import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  account: {},
  accountProfiles: [],
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    loadAccountProfiles: (state, action) => {
      state.accountProfiles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, loadAccountProfiles } = accountSlice.actions;

export const getAccount = (state) => state.account.account;
export default accountSlice.reducer;
