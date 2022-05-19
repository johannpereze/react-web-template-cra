import { Auth } from "aws-amplify";
import { TFunction } from "react-i18next";
import { NavigateFunction } from "react-router-dom";
import errorHandler, { EnqueueSnackbar } from "../hooks/errorHandler";

export interface ConfirmCode {
  confirmCode: string;
}

const confirmSignUp = async (
  { confirmCode }: ConfirmCode,
  userEmail: string,
  navigate: NavigateFunction,
  enqueueSnackbar: EnqueueSnackbar,
  t: TFunction<"translation", undefined>
) => {
  try {
    await Auth.confirmSignUp(userEmail, confirmCode);

    navigate("/login");
  } catch (error) {
    errorHandler(error, enqueueSnackbar, t);
  }
};

export default confirmSignUp;
