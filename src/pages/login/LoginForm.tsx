import { Box, Button, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import PasswordField from "../../components/passwordField/PasswordField";
import TextField from "../../components/textField/TextField";

export default function LoginForm() {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t("errors.enter_a_valid_email"))
      .required(t("errors.email_is_required")),
    password: yup
      .string()
      .min(8, t("errors.password_should_be_of_minimum_8_characters_length"))
      .required(t("errors.password_is_required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validateOnBlur: true,
    validateOnMount: true,
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box sx={{ mt: 2, mb: 0 }}>
        <TextField
          fullWidth
          formik={formik}
          name="email"
          label={t("login.email")}
        />
      </Box>
      <Box sx={{ mt: 2, mb: 0 }}>
        <PasswordField
          fullWidth
          formik={formik}
          name="password"
          label={t("login.password")}
        />
      </Box>
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
        sx={{ mt: 3 }}
      >
        {t("login.log_in")}
      </Button>
      <Typography
        sx={{ display: "flex", justifyContent: "end", mt: 2, mb: 1 }}
        variant="body2"
      >
        <Link href="/">{t("login.forgot_password")}</Link>
      </Typography>
    </Box>
  );
}
