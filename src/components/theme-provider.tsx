"use client";

import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import {
  ThemeProvider as MuiThemeProvider,
  useColorScheme,
} from "@mui/material/styles";
import { useEffect } from "react";
import theme from "@/theme";

interface ThemeProviderProps {
  readonly children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { setMode } = useColorScheme();

  useEffect(() => {
    const storedMode = localStorage.getItem("mui-mode");
    const systemMode = globalThis.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialMode = storedMode || systemMode;

    setMode(initialMode as "light" | "dark");
  }, [setMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <InitColorSchemeScript attribute="class" />
      {children}
    </MuiThemeProvider>
  );
}
