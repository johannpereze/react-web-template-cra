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
    updateUser: (state, action: PayloadAction<AuthState>) => {
      state.user_id = action.payload.user_id;
      state.email = action.payload.email;
      state.family_name = action.payload.family_name;
      state.given_name = action.payload.given_name;
    },
    deleteUser: (state) => {
      state.user_id = "";
      state.email = "";
      state.family_name = "";
      state.given_name = "";
    },
  },
});

export const { updateUser, deleteUser } = authSlice.actions;

export default authSlice.reducer;
