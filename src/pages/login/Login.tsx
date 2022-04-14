import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface LoginProps {
  register?: boolean;
}

export default function Login({ register }: LoginProps) {
  const { t } = useTranslation();
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
          {register ? <RegisterForm /> : <LoginForm />}
        </Paper>
        {!register && (
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
            <Typography variant="body2">
              {t("login.not_registered")}{" "}
              <Link to="/register">{t("login.create_an_account")}</Link>
            </Typography>
          </Paper>
        )}
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
};
