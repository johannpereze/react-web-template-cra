import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/languageSelector/LanguageSelector";
import ThemeSelector from "../components/themeSelector/ThemeSelector";

export default function Login() {
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: 300,
          }}
        >
          <Typography variant="h4">{t("general.login")}</Typography>
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <TextField />
            <TextField />
            <Button variant="outlined">Login</Button>
          </Paper>
          <LanguageSelector />
        </Box>
      </Grid>
      <hr />
      <Grid item xs={12}>
        <ThemeSelector />
      </Grid>
    </Grid>
  );
}
