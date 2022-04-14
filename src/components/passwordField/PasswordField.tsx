import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput as MuiOutlinedInput,
} from "@mui/material";
import { pick } from "dot-object";
import { t } from "i18next";
import { MouseEvent, useState } from "react";

interface TextFieldProps {
  formik: any; // TODO: change any
  name: string;
  fullWidth?: boolean;
  label?: string | null;
}

export default function PasswordField({
  formik,
  name,
  fullWidth,
  label,
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined">
      {/* TODO: Error prop missing for inputlabel */}
      <InputLabel
        error={pick(name, formik.touched) && Boolean(pick(name, formik.errors))}
        htmlFor={name}
      >
        {t("login.password")}
      </InputLabel>

      <MuiOutlinedInput
        fullWidth={fullWidth}
        id={name}
        type={showPassword ? "text" : "password"}
        name={name}
        label={label}
        value={pick(name, formik.values)}
        onChange={formik.handleChange}
        error={pick(name, formik.touched) && Boolean(pick(name, formik.errors))}
        // helperText={pick(name, formik.touched) && pick(name, formik.errors)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {pick(name, formik.touched) && Boolean(pick(name, formik.errors)) && (
        <FormHelperText error>{pick(name, formik.errors)}</FormHelperText>
      )}
    </FormControl>
  );
}

PasswordField.defaultProps = {
  fullWidth: false,
  label: null,
};
