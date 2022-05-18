import { TextField as MuiTexField } from "@mui/material";
import { pick } from "dot-object";
import { FormikProps } from "formik";

interface TextFieldProps {
  formik: FormikProps<any>;
  name: string;
  fullWidth?: boolean;
  label?: string | null;
  value?: string;
  type?: "text" | "number";
}

export default function TextField({
  formik,
  name,
  fullWidth,
  label,
  value,
  type,
}: TextFieldProps) {
  if (value === null) {
    value = pick(name, formik.values);
  }
  return (
    <MuiTexField
      fullWidth={fullWidth}
      name={name}
      label={label}
      value={value}
      onChange={formik.handleChange}
      error={pick(name, formik.touched) && Boolean(pick(name, formik.errors))}
      helperText={pick(name, formik.touched) && pick(name, formik.errors)}
      onBlur={() => formik.setFieldTouched(name, true)}
      type={type}
    />
  );
}

TextField.defaultProps = {
  fullWidth: false,
  label: null,
  type: "text",
  value: null,
};
