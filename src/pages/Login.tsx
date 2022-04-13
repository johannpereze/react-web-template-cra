import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/languageSelector/LanguageSelector";
import ThemeSelector from "../components/themeSelector/ThemeSelector";

export default function Login() {
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
            p: 3,
            my: 1,
          }}
        >
          <TextField />
          <TextField />
          <Button variant="outlined">Login</Button>
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
          <Typography variant="body2">
            {t("login.not_registered")} {t("login.create_an_account")}
          </Typography>
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
        <Box sx={{ width: 300 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LanguageSelector />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <ThemeSelector />
      </Grid>
    </Grid>
  );
}
