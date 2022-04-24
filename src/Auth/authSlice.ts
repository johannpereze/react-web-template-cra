import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  username: string;
}

const initialState: AuthState = {
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { updateUserName } = authSlice.actions;

export default authSlice.reducer;
