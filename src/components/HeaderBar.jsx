import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Image, { Label } from "@mui/icons-material";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";

import LinkNext from "next/link";
import AvatarDropdown from "@/components/AvatarDropdown";
import Layout from "../components/dashboard-page/Layout";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import CoursesList from "@/components/dashboard-page/CoursesList";
import FormCreateClass from "@/components/dashboard-page/FormCreateClass";
import withAuth from "@/auth/with-auth";
import { set } from "react-hook-form";
import Loading from "@/components/Loading";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const HeaderBar = ({ isHomePage }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddCourseButton, setOpenAddCourseButton] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [openForm, setOpenForm] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  //   const isTokenExpired = (token) => {
  //     const decodedToken = jwt.decode(token);
  //     return decodedToken.exp * 1000 < Date.now();
  //   };

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

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenAddCourseButton((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" color="success">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}>            
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}>
            Classroom
          </Typography>
          {isHomePage && (
            <Fab
              onClick={handleClick("bottom-end")}
              sx={{
                marginRight: 5,
                position: "relative",
              }}
              size="small"
              // color="primary"
              aria-label="add">
              <AddIcon />
            </Fab>
          )}
          <Popper
            open={openAddCourseButton}
            anchorEl={anchorEl}
            // placement={placement}
            placement="bottom"
            sx={{ position: "fixed", boxShadow: "10" }}
            transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <div className="px-4 py-2 hover:bg-gray-100">
                    <Button
                      sx={{ border: "none" }}
                      variant="outlined"
                      // onClick={() => setOpen(true)}
                    >
                      Enroll Classroom
                    </Button>
                  </div>
                  <div className="px-4 pb-2 hover:bg-gray-100">
                    <Button
                      sx={{ border: "none", textColor: "black" }}
                      variant="outlined"
                      onClick={() => setOpenForm(true)}>
                      Create Classroom
                    </Button>
                  </div>
                </Paper>
              </Fade>
            )}
          </Popper>

          {/* <AddIcon
              id="basic-button"
              aria-controls={openMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleClickAddIcon}
              sx={{
                m: 1,
                p: 0.6,
                backgroundColor: "white",
                borderRadius: 19,
                color: "black",
                fontSize: 38,
                boxShadow: "10",
                shadowColor: "#888888",
                "&:hover": { cursor: "pointer" },
                "&:active": { backgroundColor: "#bdbdbd" },
                "&:focus": { backgroundColor: "#bdbdbd" },
              }}></AddIcon>
            <Menu
              id="basic-menu"
              sx={{
                // transform: "translate(-7%, -1%)",
                position: "fixed",
                // boxShadow: "10",
                shadowColor: "#888888",
                top: -5,
                right: -50,
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={() => setOpenForm(true)}>
                Enroll Classroom
              </MenuItem>
              <MenuItem onClick={() => setOpenForm(true)}>
                Create Classroom
              </MenuItem>
            </Menu> */}
          <LinkNext href="/">
            <Typography sx={{ paddingRight: 5 }}>{currentUser} </Typography>
          </LinkNext>
          <AvatarDropdown></AvatarDropdown>
          <Typography variant="title" color="inherit" noWrap>
            &nbsp; &nbsp; &nbsp;
          </Typography>
        </Toolbar>
      </AppBar>      
      <FormCreateClass
        open={openForm}
        onClose={() => setOpenForm(false)}
        onCancel={() => setOpenForm(false)}
      />
    </Box>
  );
};

export default HeaderBar;
//export default withAuth(HomePage, ["admin", "teacher", "student"]);
