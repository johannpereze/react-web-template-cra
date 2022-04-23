import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import userPool from "../../Auth/cognito";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import LoginForm from "./LoginForm";
import RecoveryForm from "./RecoveryForm";
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
interface LoginProps {
  register?: boolean;
  passwordRecovery?: boolean;
}

export default function Login({ register, passwordRecovery }: LoginProps) {
  const { t } = useTranslation();

  const singUpSubmit = (values: SignInValues) => {
    console.log("Hacemos Sign In");
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
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
    console.log("Login", attrList, emailAttribute);
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
          {register && <RegisterForm submit={singUpSubmit} />}
          {passwordRecovery && <RecoveryForm />}
          {!register && !passwordRecovery && <LoginForm />}
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
          {register && (
            <Typography variant="body2">
              {t("login.already_registered")}{" "}
              <Link component={NavLink} to="/">
                {t("login.log_in")}
              </Link>
            </Typography>
          )}
          {passwordRecovery && (
            <Typography variant="body2">
              {t("login.go_back_to")}{" "}
              <Link component={NavLink} to="/">
                {t("general.login")}
              </Link>
            </Typography>
          )}
          {!passwordRecovery && !register && (
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

Login.defaultProps = {
  register: false,
  passwordRecovery: false,
};
