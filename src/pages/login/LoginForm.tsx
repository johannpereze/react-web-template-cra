import { Box, Button, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import PasswordField from "../../components/passwordField/PasswordField";
import TextField from "../../components/textField/TextField";
import type { LoginValues } from "./Login";

interface LoginFormProps {
  submit: (values: LoginValues) => void;
}

export default function LoginForm({ submit }: LoginFormProps) {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    username: yup.string().required(t("errors.email_is_required")),
    password: yup
      .string()
      .min(8, t("errors.password_should_be_of_minimum_8_characters_length"))
      .required(t("errors.password_is_required")),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submit(values);
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
          name="username"
          label={t("login.username")}
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
        <Link component={NavLink} to="/password-recovery">
          {t("login.forgot_password")}
        </Link>
      </Typography>
    </Box>
  );
}
