import { Auth } from "aws-amplify";
import { AppDispatch } from "../app/store";
import { updateUser } from "./authSlice";
import { LoginValues } from "./signIn";

export interface UserAttributes extends LoginValues {
  given_name: string;
  family_name: string;
}

const signUp = async (
  { email, password, given_name, family_name }: UserAttributes,
  dispatch: AppDispatch
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
    console.log("user.getUsername()", user.getUsername());
    const userAttributes = user.getUserData((err, data) => data);
    console.log("userAttributes", userAttributes);
    dispatch(
      updateUser({
        user_id: user.getUsername(),
        email: "",
        family_name: "",
        given_name: "",
      })
    );
  } catch (error) {
    console.log("error signing up:", error);
  }
};

export default signUp;
