import { TextField as MuiTexField } from "@mui/material";
import { pick } from "dot-object";

interface TextFieldProps {
  formik: any; // TODO: change any
  name: string;
  fullWidth?: boolean;
  label?: string | null;
}

export default function TextField({
  formik,
  name,
  fullWidth,
  label,
}: TextFieldProps) {
  return (
    <MuiTexField
      fullWidth={fullWidth}
      name={pick(name, formik.values)}
      label={label}
      value={formik.values.email}
      onChange={formik.handleChange}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
    />
  );
}

TextField.defaultProps = {
  fullWidth: false,
  label: null,
};
