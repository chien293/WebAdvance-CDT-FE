import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {  
  Box, 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import LinkNext from "next/link";
import CoursesList from "@/components/dashboard-page/CoursesList";
import withAuth from "@/auth/with-auth";
import { set } from "react-hook-form";
import HeaderBar from "@/components/HeaderBar";
import Loading from "@/components/Loading";

const defaultTheme = createTheme();

function HomePage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [placement, setPlacement] = React.useState();
  const [currentUser, setCurrentUser] = React.useState(null);

  const isTokenExpired = (token) => {
    const decodedToken = jwt.decode(token);
    return decodedToken.exp * 1000 < Date.now();
  };

  React.useEffect(() => {
    //takeUser();

    const fetchData = () => {
      if (router.isReady) {
        console.log(router.query);
        const userParam = router.query.user;
        const tokenParam = router.query.token;
        const tmp = "1-1-1";
        console.log(userParam + " USER DAY ");
        if (userParam && tokenParam) {
          const user = JSON.parse(decodeURI(userParam));
          const userArray = [user];
          console.log(user + " USEER!!");
          setCurrentUser(user.fullname);
          const userSave = { user: userArray, accessToken: tokenParam };
          AuthService.saveUser(userSave);
          router.replace("/home-page", undefined, { shallow: true });
        } else setCurrentUser("Chua dang nhap");
      }
      console.log("Khong co router");
    };
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.user[0].fullname);
    } else {
      fetchData();
      console.log("3   " + user);
    }
  }, [router.isReady]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenAddCourseButton((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>        
        <HeaderBar isHomePage={true}/>
        <CoursesList />
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;
//export default withAuth(HomePage, ["admin", "teacher", "student"]);
