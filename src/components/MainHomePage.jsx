import NestedList from "./dashboard-page/NestedList";
import CoursesList from "./dashboard-page/CoursesList";
import Tabs from "@/components/class/Tabs";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const MainContent = ({
  currentSelection,
  studentClass,
  teacherClass,
  id,
  role,
}) => {
  return (
    <Box
      sx={{
        marginLeft: "240px",
        marginTop: "50px",
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      {currentSelection === "Home" && (
        <div>
          <NestedList name="Student Class">
            <CoursesList classData={studentClass} />
          </NestedList>

          <NestedList name="Teacher Class">
            <CoursesList classData={teacherClass} />
          </NestedList>
        </div>
      )}
      {currentSelection === "MapID" && <StudentIdDataTable />}
    </Box>
  );
};

export default MainContent;
