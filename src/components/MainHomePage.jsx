import NestedList from "./dashboard-page/NestedList";
import CoursesList from "./dashboard-page/CoursesList";
import StudentIdDataTable from "./admin/utils/StudentIdTable";
import Tabs from "@/components/class/Tabs";
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

const MainContent = ({
  currentSelection,
  studentClass,
  teacherClass,
  id,
  role,
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
        <Tabs classId={id} role={role} />
      )}
    </Box>
  );
};

export default MainContent;
