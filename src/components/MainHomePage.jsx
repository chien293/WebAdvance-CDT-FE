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
  socket,
}) => {
  console.log(socket, " MAIN CONTENT");
  const [currentSocket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState(null);
  useEffect(() => {
    if (socket) {
      setSocket(socket);
      console.log(currentSocket, " MAIN CONTENT current socket");
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  return (
    <Box sx={{ marginLeft: "240px", backgroundColor: "white", height: "100%" }}>
      {currentSelection === "Home" && (
        <div>
          <NestedList name="Student Class">
            <CoursesList classData={studentClass} socket={socket} />
          </NestedList>

          <NestedList name="Teacher Class">
            <CoursesList classData={teacherClass} socket={socket} />
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
        <Tabs classId={id} role={role} socket={currentSocket} />
      )}
    </Box>
  );
};

export default MainContent;
