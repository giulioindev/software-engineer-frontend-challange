"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const handleToggle = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const isDark = mode === "dark";

  return (
    <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        onClick={handleToggle}
        color="inherit"
        aria-label="toggle theme"
        sx={{
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "rotate(20deg)",
          },
        }}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
