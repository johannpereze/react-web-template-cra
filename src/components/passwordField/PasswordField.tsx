import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput as MuiOutlinedInput,
} from "@mui/material";
import { pick } from "dot-object";
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
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

      <MuiOutlinedInput
        fullWidth={fullWidth}
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name={pick(name, formik.values)}
        label={label}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        // helperText={formik.touched.email && formik.errors.email}
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
    </FormControl>
  );
}

PasswordField.defaultProps = {
  fullWidth: false,
  label: null,
};
