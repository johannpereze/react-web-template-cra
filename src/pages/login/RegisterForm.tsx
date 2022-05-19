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
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { UserAttributes } from "../../auth/signUp";
import PasswordField from "../../components/passwordField/PasswordField";
import TextField from "../../components/textField/TextField";

interface SignUpValues extends UserAttributes {
  password2: string;
}

interface RegisterFormProps {
  submit: (values: SignUpValues) => void;
}

export default function RegisterForm({ submit }: RegisterFormProps) {
  const [termsChecked, setTermsChecked] = useState(false);
  const { t } = useTranslation();
  const validationSchema = yup.object({
    given_name: yup
      .string()
      .min(3, t("error.first_name_should_be_of_minimum_3_characters_long"))
      .max(20, t("error.first_name_should_be_of_maximum_20_characters_long"))
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
      )
      .required(t("errors.login.first_name_is_required")),
    family_name: yup
      .string()
      .min(3, t("error.last_name_should_be_of_minimum_3_characters_long"))
      .max(20, t("error.last_name_should_be_of_maximum_20_characters_long"))
      .matches(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
      )
      .required(),
    email: yup
      .string()
      .email(t("errors.login.enter_a_valid_email"))
      .required(t("errors.login.email_is_required")),
    password: yup
      .string()
      .min(8, t("errors.login.password_should_be_of_minimum_8_characters_long"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-"!@#%&/,><':;|_~`])\S{8,99}$/,
        t("errors.login.please_make_sure_your_passwor_validation_schema")
      )
      .required(t("errors.login.password_is_required")),
    password2: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        t("errors.login.your_passwords_do_not_match")
      )
      .required(t("errors.login.password_is_required")),
  });

  const initialValues: SignUpValues = {
    given_name: "",
    family_name: "",
    email: "",
    password: "",
    password2: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      submit(values);
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
          name="given_name"
          label={t("login.first_name")}
        />
      </Box>
      <Box sx={{ mt: 2, mb: 0 }}>
        <TextField
          fullWidth
          formik={formik}
          name="family_name"
          label={t("login.last_name")}
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
