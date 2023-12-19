import * as React from "react";
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  Box,
} from "@mui/material";
import authService from "@/auth/auth-service";
import LinkNext from "next/link";
import Layout from "../components/dashboard-page/Layout";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";
import Tabs from "../components/dashboard-page/Tabs";

const defaultTheme = createTheme();

export default function Class() {
  const [currentSelection, setCurrentSelection] = useState("Class");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <HeaderBar />
        <SideBar setCurrentSelection={setCurrentSelection} />
        <Tabs />
      </Box>
    </ThemeProvider>
  );
}
