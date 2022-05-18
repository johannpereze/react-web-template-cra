import { Auth } from "aws-amplify";
import { NavigateFunction } from "react-router-dom";

export interface ConfirmCode {
  confirmCode: string;
}

const confirmSignUp = async (
  { confirmCode }: ConfirmCode,
  username: string,
  navigate: NavigateFunction
) => {
  try {
    await Auth.confirmSignUp(username, confirmCode);
    navigate("/");
  } catch (error) {
    console.log("error confirming sign up", error);
  }
};

export default confirmSignUp;
