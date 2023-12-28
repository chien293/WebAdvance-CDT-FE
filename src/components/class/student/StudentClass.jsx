import NestedList from "@/components/dashboard-page/NestedList";
import CoursesList from "@/components/dashboard-page/CoursesList";
import StudentIdDataTable from "@/components/admin/utils/StudentIdTable";
import Tabs from "@/components/class/student/StudentTabs";
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

const StudentClass = ({
  currentSelection,
  studentClass,
  teacherClass,
  id,
  role,
}) => {
  const [currentSocket, setSocket] = useState(null);

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
        <Tabs classId={id} role={role}/>
      )}
    </Box>
  );
};

export default StudentClass;
