import { Auth } from "aws-amplify";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { deleteUser } from "./authSlice";

const logout = async (dispatch: AppDispatch, navigate: NavigateFunction) => {
  try {
    await Auth.signOut();
    console.log("Logged out");
    dispatch(deleteUser());
    navigate("/");
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

export default logout;
