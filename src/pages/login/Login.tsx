import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUserName } from "../../Auth/authSlice";
import userPool, { CognitoSignUpResponse } from "../../Auth/cognito";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import LoginForm from "./LoginForm";
import RecoveryForm from "./RecoveryForm";
import RegisterConfirmForm from "./RegisterConfirmForm";
import RegisterForm from "./RegisterForm";

interface LoginValues {
  email: string;
  password: string;
}

interface userValues extends LoginValues {
  username: string;
}
export interface SignInValues extends LoginValues {
  username: string;
  password2: string;
}

export interface ConfirmCode {
  confirmCode: string;
}
interface LoginProps {
  step: "login" | "register" | "passwordRecovery" | "confirmationCode";
}

export default function Login({ step }: LoginProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.auth.username);

  const singUpSubmit = (values: SignInValues) => {
    const user: userValues = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: "email",
      Value: values.email,
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    userPool.signUp(
      user.username,
      user.password,
      attrList,
      // @ts-ignore
      null,
      (err, result: CognitoSignUpResponse) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          dispatch(updateUserName(result.user.username));
        }
      }
    );
    console.log("Login", attrList, emailAttribute);
  };

  const confirmSingUpSubmit = (values: ConfirmCode) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(
      values.confirmCode.toString(),
      true,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          navigate("/home");
        }
      }
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ mt: 8, mb: 4 }}>
          {t("general.login")}
        </Typography>
        <Paper
          elevation={4}
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 1,
            my: 1,
          }}
        >
          {step === "register" && <RegisterForm submit={singUpSubmit} />}
          {step === "passwordRecovery" && <RecoveryForm />}
          {step === "confirmationCode" && (
            <RegisterConfirmForm submit={confirmSingUpSubmit} />
          )}
          {step === "login" && <LoginForm />}
        </Paper>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            width: 300,
            display: "flex",
            justifyContent: "center",
            p: 2,
            my: 1,
          }}
        >
          {(step === "register" || step === "confirmationCode") && (
            <Typography variant="body2">
              {t("login.already_registered")}{" "}
              <Link component={NavLink} to="/">
                {t("login.log_in")}
              </Link>
            </Typography>
          )}
          {step === "passwordRecovery" && (
            <Typography variant="body2">
              {t("login.go_back_to")}{" "}
              <Link component={NavLink} to="/">
                {t("general.login")}
              </Link>
            </Typography>
          )}
          {step === "login" && (
            <Typography variant="body2">
              {t("login.not_registered")}{" "}
              <Link component={NavLink} to="/register">
                {t("login.create_an_account")}
              </Link>
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: 300, mb: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LanguageSelector />
            </Grid>
            <Grid item xs={6}>
              <ThemeSelector />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
