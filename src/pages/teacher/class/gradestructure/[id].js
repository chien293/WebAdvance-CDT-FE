import { useState, useContext, useEffect } from "react";
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
import GradeStructureBoard from '@/components/class/GradeStructure'
const defaultTheme = createTheme();

const SIDE_NAV_WIDTH = 280;

import { useRouter } from "next/router";
import Router from 'next/router'


const GradeStructurePage = () => {
  const router = useRouter();
  const { id, query } = router.query;
  const { studentClass, teacherClass } = useContext(ClassContext);
  const [currentSelection, setCurrentSelection] = useState("Tabs");
  
  return (
    <div>
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
            tabs={5}
          />
          <Box
            sx={{
              width: "calc(100% - 250px)",
              typography: "body1",
              marginTop: 15,
              marginLeft:30,
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              backgroundColor: "white",
              overflowY: "auto",
              top: 0,
              bottom: 0,
            }}
          >
            <GradeStructureBoard classId={id} />
          </Box>

        </Box>
      </ThemeProvider>

    </div>
  )
}

export default GradeStructurePage
