import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";

interface ThemeManagerProps {
  children: JSX.Element;
}
export default function ThemeManager({ children }: ThemeManagerProps) {
  const themeManager = useAppSelector((state: RootState) => state.themeManager);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const paletteMode = (): PaletteMode | undefined => {
    if (themeManager.themeMode === "inherited") {
      return prefersDarkMode ? "dark" : "light";
    }
    return themeManager.themeStyle;
  };

  const customTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode(),
          ...(paletteMode() === "light"
            ? {
                // palette values for light mode
                background: {
                  paper: "#fff",
                  default: "#f8f8f8",
                },
              }
            : {
                // palette values for dark mode
                background: {
                  paper: "#121212",
                  default: "#121212",
                },
              }),
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
