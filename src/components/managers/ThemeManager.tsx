import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

interface ThemeManagerProps {
  children: JSX.Element;
}
export default function ThemeManager({ children }: ThemeManagerProps) {
  const themeManager = useAppSelector((state: RootState) => state.themeManager);

  const customTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeManager.themeStyle,
        },
      }),
    [themeManager.themeStyle]
  );
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
