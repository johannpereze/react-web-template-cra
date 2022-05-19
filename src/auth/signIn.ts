import { Auth } from "aws-amplify";
import { TFunction } from "react-i18next";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../app/store";
import errorHandler, { EnqueueSnackbar } from "../hooks/errorHandler";
import { updateUser } from "./authSlice";

export interface LoginValues {
  email: string;
  password: string;
}

const signIn = async (
  { email, password }: LoginValues,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  enqueueSnackbar: EnqueueSnackbar,
  t: TFunction<"translation", undefined>
) => {
  try {
    const user = await Auth.signIn(email, password);
    const {
      email: _email,
      family_name: _family_name,
      given_name: _given_name,
      sub,
    } = user.attributes;
    dispatch(
      updateUser({
        user_id: sub,
        email: _email,
        family_name: _family_name,
        given_name: _given_name,
      })
    );
    navigate("/", { replace: true });
  } catch (error) {
    errorHandler(error, enqueueSnackbar, t);
    // TODO: login button remains innactive
  }
};

export default signIn;
