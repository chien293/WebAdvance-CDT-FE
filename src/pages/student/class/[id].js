import * as React from "react";
import { useState, useContext } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";
import { ClassContext } from "@/components/ClassProvider";
import StudentClass from "@/components/class/student/StudentClass";

const defaultTheme = createTheme();

const SIDE_NAV_WIDTH = 280;

import { useRouter } from "next/router";
import withAuth from "@/auth/with-auth";

function Class() {
  const router = useRouter();
  const { id, tabs } = router.query;
  const { studentClass, teacherClass } = useContext(ClassContext);
  const [currentSelection, setCurrentSelection] = useState("Tabs");

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <HeaderBar />
        <SideBar
          setCurrentSelection={setCurrentSelection}
          studentClass={studentClass}
          teacherClass={teacherClass}
        />
        <StudentClass
          currentSelection={currentSelection}
          studentClass={studentClass}
          teacherClass={teacherClass}
          id={id}
          role="student"
          tabs={tabs}
        />
      </Box>
    </ThemeProvider>
  );
}

export default withAuth(Class, ["student"]);
// export default Class;
