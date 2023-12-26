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
import Tabs from "../components/class/Tabs";

const defaultTheme = createTheme();

const SIDE_NAV_WIDTH = 280;

export default function Class() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Tabs classId={id} />
      </Box>
    </ThemeProvider>
  );
}
