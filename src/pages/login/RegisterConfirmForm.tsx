import { Alert, Box, Button, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAppSelector } from "../../app/hooks";
import type { ConfirmCode } from "../../auth/confirmSignUp";
import TextField from "../../components/textField/TextField";

interface RegisterConfirmFormProps {
  submit: (values: ConfirmCode) => void;
}

export default function RegisterConfirmForm({
  submit,
}: RegisterConfirmFormProps) {
  const { t } = useTranslation();

  const username = useAppSelector((state) => state.auth.user_id);

  const validationSchema = yup.object({
    confirmCode: yup
      .string()
      .min(6, t("errors.login.confirmation_code_should_be_a_6_digits_number"))
      .max(6, t("errors.login.confirmation_code_should_be_a_6_digits_number"))
      .required(t("errors.login.confirmation_code_is_required")),
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

  const handleResendConfirmation = async () => {
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

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
        <Button onClick={handleResendConfirmation}>
          {/* TODO: give better style and resend code after user lefts the page and the code expires */}
          {t("login.send_code_again")}
        </Button>
      </Typography>
    </Box>
  );
}
