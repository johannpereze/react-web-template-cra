import { Auth } from "aws-amplify";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { updateUser } from "./authSlice";

export interface LoginValues {
  email: string;
  password: string;
}

const signIn = async (
  { email, password }: LoginValues,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  try {
    const user = await Auth.signIn(email, password);
    console.log(user.attributes);
    const {
      email: _email,
      family_name: _family_name,
      given_name: _given_name,
      sub,
    } = user.attributes;
    console.log(_email, _family_name, _given_name, sub);
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
    console.log("error signing in", error);
  }
};

export default signIn;
