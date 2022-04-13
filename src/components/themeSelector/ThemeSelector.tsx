import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "../../app/hooks";
import {
  changeThemeMode,
  changeThemeStyle,
} from "../managers/themeManagerSlice";

export default function ThemeSelector() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const toggleThemeStyle = () => {
    dispatch(changeThemeStyle());
    dispatch(changeThemeMode());
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        color: "text.primary",
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={toggleThemeStyle} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}
