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
import ClassDataTable from "@/components/admin/utils/ClassDataTable";
import axios from "axios";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import withAuth from "@/auth/with-auth";

const AdminHomePage = () => {
  const router = useRouter();

  const [role, setRole] = useState(0);
  const [selectedSideBarItem, setSelectedSideBarItem] = useState("teacher");
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
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

  const handleSideBarItemClick = (item) => {
    setSelectedSideBarItem(item);
  };

  useEffect(() => {
    takeUser();
    if (token) {
      getTeachers();
      getClasses();
    }
  }, [token]);
  return (
    <>
      <Sidebar onSideBarItemClick={handleSideBarItemClick} />
      <Container>
        <h1>{selectedSideBarItem == "teacher" ? "Teacher" : "Class"}</h1>
        {selectedSideBarItem == "teacher" ? (
          <TeacherDataTable teachers={teachers} token={token} />
        ) : (
          <ClassDataTable classes={classes} teachers={teachers} token={token}/>
        )}
      </Container>
    </>
  );
};

export default withAuth(AdminHomePage, ["admin"]);
