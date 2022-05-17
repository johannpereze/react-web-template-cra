import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateUser } from "../../Auth/authSlice";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import LoginForm from "./LoginForm";
import RecoveryForm from "./RecoveryForm";
import RegisterConfirmForm from "./RegisterConfirmForm";
import RegisterForm from "./RegisterForm";

export interface LoginValues {
  email: string;
  password: string;
}

interface UserAttributes extends LoginValues {
  given_name: string;
  family_name: string;
}
export interface SignUpValues extends UserAttributes {
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

  const username = useAppSelector((state) => state.auth.user_id);

  // TODO: handle error with incorrect user/password
  // TODO: if the account is not confirmed, resend email

  const singUpSubmit = async ({
    email,
    password,
    given_name,
    family_name,
  }: UserAttributes) => {
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

  const confirmSingUpSubmit = async ({ confirmCode }: ConfirmCode) => {
    try {
      await Auth.confirmSignUp(username, confirmCode);
      navigate("/");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const singInSubmit = async ({ email, password }: LoginValues) => {
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
      navigate("/home");
    } catch (error) {
      console.log("error signing in", error);
    }
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
          {step === "login" && <LoginForm submit={singInSubmit} />}
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
