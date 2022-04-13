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
      name={name}
      label={label}
      value={pick(name, formik.values)}
      onChange={formik.handleChange}
      error={pick(name, formik.touched) && Boolean(pick(name, formik.errors))}
      helperText={pick(name, formik.touched) && pick(name, formik.errors)}
    />
  );
}

TextField.defaultProps = {
  fullWidth: false,
  label: null,
};
