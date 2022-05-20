import { Auth } from "aws-amplify";
import { TFunction } from "react-i18next";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../app/store";
import errorHandler, { EnqueueSnackbar } from "../hooks/errorHandler";
import { setUser } from "./authSlice";
import { LoginValues } from "./signIn";

export interface UserAttributes extends LoginValues {
  given_name: string;
  family_name: string;
}

const signUp = async (
  { email, password, given_name, family_name }: UserAttributes,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  enqueueSnackbar: EnqueueSnackbar,
  t: TFunction<"translation", undefined>
) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name,
        family_name,
      },
    });
    dispatch(
      setUser({
        user_id: "",
        email: user.getUsername(),
        family_name: "",
        given_name: "",
      })
    );
    navigate("/login/confirmation-code");
  } catch (error) {
    errorHandler(error, enqueueSnackbar, t);
  }
};

export default signUp;
