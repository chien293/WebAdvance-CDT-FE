import * as React from "react";
import { useState, useContext } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";
import { ClassContext } from "@/components/ClassProvider";
import TeacherClass from "@/components/class/teacher/TeacherClass";
import { useRouter } from "next/router";
import withAuth from "@/auth/with-auth";

const defaultTheme = createTheme();

const SIDE_NAV_WIDTH = 280;

function Class() {
  const router = useRouter();
  const { id } = router.query;
  const { studentClass, teacherClass } = useContext(ClassContext);
  const [currentSelection, setCurrentSelection] = useState("Tabs");
  console.log("teacherClass", currentSelection);
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
export default withAuth(Class, ["teacher"]);
