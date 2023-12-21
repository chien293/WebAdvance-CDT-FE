import React, { useState } from "react";
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
import StudentIdDataTable from "@/components/admin/utils/StudentIdTable";
import NestedList from "@/components/dashboard-page/NestedList";
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
  const API_URL = process.env.SERVER_URL;
  React.useEffect(() => {
    const takeUser = () => {
      const user = AuthService.getCurrentUser();
      console.log(user);
      if (user) {
        setCurrentUser(user.user[0].fullname);
        setId(user.user[0].id);
        setToken(user.accessToken);
      }
    };

    takeUser();
  }, []);
  React.useEffect(() => {
    if (currentToken) getClasses();
  }, [currentToken]);

  React.useEffect(() => {
    if (studentClass.length > 0 || teacherClass.length > 0) {
      console.log("Updated studentClass:", studentClass);

      // Thực hiện các bước cần thiết khi studentClass thay đổi
      const temp = [...teacherClass, ...studentClass];
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
    console.log(JSON.stringify(currentToken));
    console.log(JSON.stringify(currentId));
    console.log(API_URL);
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
          console.log(res.data);
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
      <Box sx={{ display: "flex" }}>
        <HeaderBar isHomePage={true} />
        <Box sx={{ flexGrow: 1 }}>
          <SideBar
            setCurrentSelection={setCurrentSelection}
            studentClass={studentClass}
            teacherClass={teacherClass}
          />
          {/* layout section */}
          <Box sx={{ marginLeft: "240px", marginTop: "100px" }}>
            {currentSelection === "Home" && (
              // <CoursesList classData={dataClass} />
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
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// export default withAuth(HomePage, ["admin", "user"]);
export default HomePage;
