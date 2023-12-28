import * as React from "react";
import { useState, useContext } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
} from "@mui/material";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";
import { ClassContext } from "@/components/ClassProvider";
import TeacherClass from "@/components/class/teacher/TeacherClass";
import { useRouter } from "next/router";
const defaultTheme = createTheme();

const SIDE_NAV_WIDTH = 280;


export default function Class() {
  const router = useRouter();
  const { id } = router.query;
  const { studentClass, teacherClass } = useContext(ClassContext);
  const [currentSelection, setCurrentSelection] = useState("Tabs");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <HeaderBar isHomePage={true}/>
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
