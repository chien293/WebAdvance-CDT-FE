import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import "moment-timezone";
import { useEffect, useState } from "react";
import DetailAdmin from "@/components/admin/detailAdmin";
import ModalAdd from "@/components/admin/ModelAdd";
import Navbar from "@/components/admin/NavbarAdmin";
import Sidebar from "@/components/admin/SideBar";
import TeacherDataTable from "@/components/admin/utils/TeacherDataTable";
import StudentDataTable from "@/components/admin/utils/StudentDataTable";
import axios from "axios";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import withAuth from "@/auth/with-auth";

const AdminHomePage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [listAdminFilter, setListAdminFilter] = useState([]);

  const [role, setRole] = useState(0);
  const [selectedSideBarItem, setSelectedSideBarItem] = useState("teacher");
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [token, setToken] = useState("");
  const API_URL = process.env.SERVER_URL;
  const takeUser = () => {
    const user = AuthService.getCurrentUser();
    console.log(user.accessToken);
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
    console.log(token + " Token");
    await axios
      .get(API_URL + "/admin/getTeachers", {
        headers: {
          token: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(JSON.stringify(res) + " RES");
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

  const getStudents = async () => {
    await axios
      .get(API_URL + "/admin/getStudents", {
        headers: {
          token: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data) {
          const studentsData = res.data.map(
            ({ password, image, role, ...rest }) => rest
          );
          setStudents(studentsData);
          //setIsLoaded(true);
        } else {
          setTeachers([]);
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
      getStudents();
    }
  }, [token]);
  return (
    <>
      <Sidebar onSideBarItemClick={handleSideBarItemClick} />
      <Container>
        <h1>{selectedSideBarItem === "teacher" ? "Teacher" : "Student"}</h1>
        {selectedSideBarItem === "teacher" ? (
          <TeacherDataTable teachers={teachers} />
        ) : (
          <StudentDataTable students={students} />
        )}
      </Container>
    </>
  );
};

export default withAuth(AdminHomePage, ["admin"]);
