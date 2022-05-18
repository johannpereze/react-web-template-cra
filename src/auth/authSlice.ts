import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user_id: string;
  email: string;
  family_name: string;
  given_name: string;
}

const initialState: AuthState = {
  user_id: "",
  email: "",
  family_name: "",
  given_name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<AuthState>) => ({
      ...state,
      ...action.payload,
    }),
    deleteUser: () => initialState,
  },
});

export const { updateUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;
