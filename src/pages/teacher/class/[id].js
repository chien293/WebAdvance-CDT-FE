import * as React from "react";
import { useState, useContext } from "react";
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
// import authService from "@/auth/auth-service";
// import LinkNext from "next/link";
// import Layout from "../components/dashboard-page/Layout";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";
import Tabs from "@/components/class/Tabs";
import { ClassContext } from "@/components/ClassProvider";
import TeacherClass from "@/components/class/teacher/TeacherClass";
const defaultTheme = createTheme();

const SIDE_NAV_WIDTH = 280;

import { useRouter } from "next/router";

export default function Class() {
  const router = useRouter();
  const { id } = router.query;
  const { studentClass, teacherClass } = useContext(ClassContext);
  const [currentSelection, setCurrentSelection] = useState("Tabs");
  console.log(id + " ID trong class");
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <HeaderBar />
        <SideBar
          setCurrentSelection={setCurrentSelection}
          studentClass={studentClass}
          teacherClass={teacherClass}
        />
        <TeacherClass
          currentSelection={currentSelection}
          studentClass={studentClass}
          teacherClass={teacherClass}
          id={id}
          role="teacher"
        />
      </Box>
    </ThemeProvider>
  );
}
