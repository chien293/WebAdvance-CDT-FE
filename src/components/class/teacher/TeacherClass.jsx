import NestedList from "@/components/dashboard-page/NestedList";
import CoursesList from "@/components/dashboard-page/CoursesList";
import StudentIdDataTable from "@/components/admin/utils/StudentIdTable";
import Tabs from "@/components/class/teacher/TeacherTabs";
import {
  Button,
  CssBaseline,
  Popper,
  Fade,
  Paper,
  Divider,
  Typography,
  List,
  Toolbar,
  Fab,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

const TeacherClass = ({
  currentSelection,
  studentClass,
  teacherClass,
  id,
  role,
  tabs,
  socket,
}) => {
  return (
    <Box sx={{ marginLeft: "240px", backgroundColor: "white", height: "100%" }}>
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
      {currentSelection === "Registered" && <div>Registered Content</div>}
      {currentSelection === "Archived class" && (
        <div>Archived Class Content Here</div>
      )}
      {currentSelection === "Setting" && <div>Settings Content Here</div>}
      {currentSelection === "Tabs" && (
        <Tabs classId={id} role={role} tabs={tabs}/>
      )}
    </Box>
  );
};

export default TeacherClass;
