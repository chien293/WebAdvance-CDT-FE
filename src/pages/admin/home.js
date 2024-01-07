
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
import AdminManageStudentID from "@/components/admin/AdminManageStudentID";

const AdminHomePage = () => {
  const router = useRouter();
  const [selectedSideBarItem, setSelectedSideBarItem] = useState("teacher");

  const API_URL = process.env.SERVER_URL;

  const handleSideBarItemClick = (item) => {
    setSelectedSideBarItem(item);
  };

  return (
    <>
      <Box style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onSideBarItemClick={handleSideBarItemClick} />
      <Container style={{marginRight: 100, marginTop: 30}}>
        <h1 style={{marginBottom: 40}}>{selectedSideBarItem === "teacher"
          ? "Teacher"
          : selectedSideBarItem === "class"
            ? "Class"
            : "MapId"}</h1>
        {selectedSideBarItem === "teacher" ? (
          <TeacherDataTable />
        ) : selectedSideBarItem === "class" ? (
          <ClassDataTable />
        ) : selectedSideBarItem === "mapId" ? (
          <AdminManageStudentID />
        ) : null}

      </Container>
    </Box >

    </>
  );
};

export default withAuth(AdminHomePage, ["admin"]);
