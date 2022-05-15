import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userId: string;
}

const initialState: AuthState = {
  userId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { updateUserId } = authSlice.actions;

export default authSlice.reducer;
