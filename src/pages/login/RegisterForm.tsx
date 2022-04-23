import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import PasswordField from "../../components/passwordField/PasswordField";
import TextField from "../../components/textField/TextField";
import type { SignInValues } from "./Login";

interface RegisterFormProps {
  submit: (values: SignInValues) => void;
}

export default function RegisterForm({ submit }: RegisterFormProps) {
  const [termsChecked, setTermsChecked] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, t("errors.name_should_be_of_minimum_3_characters_length"))
      .required(t("errors.name_is_required")),
    email: yup
      .string()
      .email(t("errors.enter_a_valid_email"))
      .required(t("errors.email_is_required")),
    password: yup
      .string()
      .min(8, t("errors.password_should_be_of_minimum_8_characters_length"))
      .required(t("errors.password_is_required")),
    password2: yup
      .string()
      .oneOf([yup.ref("password")], t("errors.your_passwords_do_not_match"))
      .required(t("errors.password_is_required")),
  });

  const initialValues: SignInValues = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      submit(values);
      navigate("/");
    },
    validateOnBlur: true,
    validateOnMount: true,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
    >
      <Box sx={{ mt: 2, mb: 0 }}>
        <TextField
          fullWidth
          formik={formik}
          name="username"
          label={t("login.name")}
        />
      </Box>
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
      <Box sx={{ mt: 2, mb: 0 }}>
        <PasswordField
          fullWidth
          formik={formik}
          name="password2"
          label={t("login.repeat_password")}
        />
      </Box>

      <FormControlLabel
        sx={{ my: 1, alignSelf: "center" }}
        control={
          <Checkbox
            checked={termsChecked}
            onChange={() => setTermsChecked(!termsChecked)}
          />
        }
        label={
          <Typography variant="body2" sx={{ mt: 0.3 }}>
            {t("login.i_accept")}{" "}
            <Link component={NavLink} to="/privacy-policy">
              {t("general.terms_and_conditions")}
            </Link>
          </Typography>
        }
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={!formik.isValid || formik.isSubmitting || !termsChecked}
        sx={{ mb: 3, mt: 1 }}
      >
        {t("login.create_account")}
      </Button>
    </Box>
  );
}
