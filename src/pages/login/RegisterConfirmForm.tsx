import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAppSelector } from "../../app/hooks";
import type { ConfirmCode } from "../../auth/confirmSignUp";
import resendAuthConfirmation from "../../auth/resendAuthConfirmation";
import TextField from "../../components/textField/TextField";

interface RegisterConfirmFormProps {
  submit: (values: ConfirmCode) => void;
}

const waitingTimeForResend = 30;

export default function RegisterConfirmForm({
  submit,
}: RegisterConfirmFormProps) {
  const [disabled, setDisabled] = useState(false);
  const [codeSended, setCodeSended] = useState(false);
  const [time, setTime] = useState(waitingTimeForResend);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const userEmail = useAppSelector((state) => state.auth.email);

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

  const handleResendConfirmation = async () => {
    resendAuthConfirmation(userEmail, enqueueSnackbar, t);
    setDisabled(true);
    setCodeSended(true);
  };

  useEffect(() => {
    // TODO: any
    let intervalId: any;
    if (codeSended) {
      setTimeout(() => {
        setDisabled(false);
        clearInterval(intervalId);
        setTime(waitingTimeForResend);
      }, waitingTimeForResend * 1000);

      intervalId = setInterval(() => {
        if (time > 0) {
          setTime((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [codeSended]);

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
        <LoadingButton
          onClick={handleResendConfirmation}
          size="small"
          // loading
          variant="outlined"
          type="button"
          disabled={disabled}
        >
          {/* TODO: give better style and resend code after user lefts the page and the code expires */}
          {disabled
            ? `${t("login.wait_for_resend")} ${time}`
            : t("login.send_code_again")}
        </LoadingButton>
      </Typography>
    </Box>
  );
}
