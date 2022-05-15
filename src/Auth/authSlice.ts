import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userId: string;
  email: string;
  family_name: string;
  given_name: string;
}

const initialState: AuthState = {
  userId: "",
  email: "",
  family_name: "",
  given_name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.family_name = action.payload.family_name;
      state.given_name = action.payload.given_name;
    },
    deleteUser: (state) => {
      state.userId = "";
      state.email = "";
      state.family_name = "";
      state.given_name = "";
    },
  },
});

export const { updateUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;
