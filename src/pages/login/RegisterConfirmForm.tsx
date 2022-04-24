import { Alert, Box, Button, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import TextField from "../../components/textField/TextField";
import type { ConfirmCode } from "./Login";

interface RegisterConfirmFormProps {
  submit: (values: ConfirmCode) => void;
}

export default function RegisterConfirmForm({
  submit,
}: RegisterConfirmFormProps) {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    confirmCode: yup
      .string()
      .min(6, t("errors.confirmation_code_should_be_a_6_digits_number"))
      .max(6, t("errors.confirmation_code_should_be_a_6_digits_number"))
      .required(t("errors.confirmation_code_is_required")),
  });

  const formik = useFormik({
    initialValues: {
      confirmCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submit(values);
    },
    validateOnBlur: true,
    validateOnMount: true,
  });
  console.log(formik.values);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Alert sx={{ mt: 2 }} severity="info">
        {t("login.past_here_the_code_we_sent_to_your_registered_email")}
      </Alert>
      <Box sx={{ mt: 2, mb: 0 }}>
        <TextField
          fullWidth
          type="text"
          formik={formik}
          name="confirmCode"
          label={t("login.confirmation_code")}
        />
      </Box>
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
        sx={{ mt: 3 }}
      >
        {t("login.confirm_email")}
      </Button>
      <Typography
        sx={{ display: "flex", justifyContent: "end", mt: 2, mb: 1 }}
        variant="body2"
      >
        <Link component={NavLink} to="/">
          {/* TODO: Implement */}
          {t("login.send_code_again")}
        </Link>
      </Typography>
    </Box>
  );
}
