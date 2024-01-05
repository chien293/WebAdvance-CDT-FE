import React, { useState, useContext, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import LinkNext from "next/link";
import CoursesList from "@/components/dashboard-page/CoursesList";
import withAuth from "@/auth/with-auth";
import { set } from "react-hook-form";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";
import Loading from "@/components/Loading";
import axios from "axios";

import NestedList from "@/components/dashboard-page/NestedList";
import { ClassContext, ClassProvider } from "@/components/ClassProvider";
import { useSocket } from "@/components/SocketProvider";
import { io } from "socket.io-client";
import MainContent from "@/components/MainHomePage";
const defaultTheme = createTheme();

function HomePage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [placement, setPlacement] = React.useState();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentId, setId] = useState(null);
  const [studentClass, setStudentClass] = useState([]);
  const [teacherClass, setTeacherClass] = useState([]);
  const [classData, setClassData] = useState([]);
  const [currentToken, setToken] = useState(null);
  const [currentSocket, setCurrentSocket] = useState(null);
  const { updateClasses } = useContext(ClassContext);
  const socket = useSocket();
  const API_URL = process.env.SERVER_URL;

  console.log("socket", socket);

  useEffect(() => {
    const takeUser = () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user.user[0].fullname);
        setId(user.user[0].id);
        setToken(user.accessToken);
      }
    };

    takeUser();
    setCurrentSocket(socket);
  }, []);

  useEffect(() => {
    if (currentSocket) {
      currentSocket.emit("newUser", currentId);
    }
  }, [currentSocket]);

  useEffect(() => {
    if (currentToken) getClasses();
  }, [currentToken]);

  useEffect(() => {
    if (studentClass.length > 0 || teacherClass.length > 0) {
      const temp = [...teacherClass, ...studentClass];
      updateClasses(studentClass, teacherClass);
      setClassData(temp);
    }
  }, [studentClass, teacherClass]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenAddCourseButton((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [currentSelection, setCurrentSelection] = useState("Home"); // default selection

  const getClasses = async () => {
    await axios
      .post(
        API_URL + "/class/getTeacherClasses",
        {
          id: currentId,
        },
        {
          headers: {
            token: "Bearer " + currentToken,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          const teachersData = res.data;
          setTeacherClass(teachersData);
        } else {
          setTeacherClass([]);
        }
      });

    await axios
      .post(
        API_URL + "/class/getStudentClasses",
        {
          id: currentId,
        },
        {
          headers: {
            token: "Bearer " + currentToken,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setStudentClass(res.data);
        }
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <HeaderBar isHomePage={true} />
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <SideBar
            setCurrentSelection={setCurrentSelection}
            studentClass={studentClass}
            teacherClass={teacherClass}
          />
          {/* layout section */}
          <MainContent
            currentSelection={currentSelection}
            studentClass={studentClass}
            teacherClass={teacherClass}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default withAuth(HomePage, ["admin", "user"]);
