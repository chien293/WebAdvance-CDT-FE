
import {
  Box,
  Button,
  Container,
} from "@mui/material";
import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/SideBar";
import TeacherDataTable from "@/components/admin/utils/TeacherDataTable";
import ClassDataTable from "@/components/admin/utils/ClassDataTable";
import axios from "axios";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import withAuth from "@/auth/with-auth";
import AdminStudentIdTable from "@/components/admin/utils/AdminStudentIdTable";

const AdminHomePage = () => {
  const router = useRouter();

  const [role, setRole] = useState(0);
  const [selectedSideBarItem, setSelectedSideBarItem] = useState("teacher");
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [token, setToken] = useState("");

  const API_URL = process.env.SERVER_URL;
  const takeUser = () => {
    const user = AuthService.getCurrentUser();

    if (isTokenExpired(user.accessToken) || !user.accessToken) {
      router.push({ pathname: "/auth/sign-in" });
    }
    if (user.accessToken) {
      setToken(user.accessToken);
    }
  };

  const isTokenExpired = (token) => {
    const decodedToken = jwt.decode(token);
    return decodedToken.exp * 1000 < Date.now();
  };

  const getTeachers = async () => {

    await axios
      .get(API_URL + "/admin/getTeachers", {
        headers: {
          token: "Bearer " + token,
        },
      })
      .then((res) => {

        if (res.data) {
          const teachersData = res.data.map(
            ({ password, image, role, ...rest }) => rest
          );
          setTeachers(teachersData);
          //setIsLoaded(true);
        } else {
          setTeachers([]);
        }
      });
  };

  const getClasses = async () => {
    await axios
      .get(API_URL + "/admin/getClasses", {
        headers: {
          token: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data) {
          const clasesData = res.data.map(
            ({ password, image, role, ...rest }) => rest
          );
          setClasses(clasesData);
          //setIsLoaded(true);
        } else {
          setClasses([]);
        }
      });
  };

  const getStudentIds = async () => {
    await axios
      .get(API_URL + "/admin/getStudentIds", {
        headers: {
          token: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          const clasesData = res.data
          setStudentIds(clasesData);
          //setIsLoaded(true);
        } else {
          setStudentIds([]);
        }
      });
  };

  const handleSideBarItemClick = (item) => {
    setSelectedSideBarItem(item);
  };

  useEffect(() => {
    takeUser();
    if (token) {
      getTeachers();
      getClasses();
      getStudentIds();
    }
  }, [token]);
  return (
    <>
      <Box style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onSideBarItemClick={handleSideBarItemClick} />
      <Container>
        <h1 style={{marginBottom: 40}}>{selectedSideBarItem === "teacher"
          ? "Teacher"
          : selectedSideBarItem === "class"
            ? "Class"
            : "MapId"}</h1>
        {selectedSideBarItem === "teacher" ? (
          <TeacherDataTable teachers={teachers} token={token} />
        ) : selectedSideBarItem === "class" ? (
          <ClassDataTable classes={classes} teachers={teachers} token={token} />
        ) : selectedSideBarItem === "mapId" ? (
          <AdminStudentIdTable studentIds={studentIds} token={token} />
        ) : null}

      </Container>
    </Box >

    </>
  );
};

export default withAuth(AdminHomePage, ["admin"]);
