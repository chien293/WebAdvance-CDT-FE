import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  CssBaseline,
  Popper,
  Fade,
  Paper,
  Modal,
  InputAdornment,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  Fab,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Image, { Label } from "@mui/icons-material";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
  middleListItems,
  bottomListItems,
  topListItems,
} from "../components/dashboard-page/listItems";
import authService from "@/auth/auth-service";
import LinkNext from "next/link";
import AvatarDropdown from "@/components/AvatarDropdown";
import Layout from "../components/dashboard-page/Layout";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import CoursesList from "@/components/dashboard-page/CoursesList";
import FormCreateClass from "@/components/dashboard-page/FormCreateClass";

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function HomePage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    // authCheck();
    fetchData();
  }, [router.isReady]);

  const fetchData = async () => {
    if (router.isReady) {
      console.log(router.query);
      const userParam = router.query.user;
      const tokenParam = router.query.token;
      if (userParam && tokenParam) {
        const user = JSON.parse(decodeURI(userParam));
        setCurrentUser(user.displayName);

        router.replace("/home-page", undefined, { shallow: true });
      } else setCurrentUser("Chua dang nhap");
    }
  };

  // const authCheck = async () => {
  //   const user = AuthService.getCurrentUser();

  //   if (isTokenExpired(user.accessToken) || !user.accessToken) {
  //     router.push({ pathname: "/auth/sign-in" });
  //   }
  //   if (user) {
  //     setCurrentUser(user.user[0].fullname);
  //   }
  // };

  const isTokenExpired = (token) => {
    const decodedToken = jwt.decode(token);
    return decodedToken.exp * 1000 < Date.now();
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddCourseButton, setOpenAddCourseButton] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenAddCourseButton((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="success">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Classroom
            </Typography>
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
            <LinkNext href="/">
              <Typography sx={{ paddingRight: 5 }}>{currentUser} </Typography>
            </LinkNext>

            <AvatarDropdown></AvatarDropdown>
            <Typography variant="title" color="inherit" noWrap>
              &nbsp; &nbsp; &nbsp;
            </Typography>
            <Popper
              open={openAddCourseButton}
              anchorEl={anchorEl}
              placement={placement}
              sx={{ position: "absolute" }}
              transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      Enroll Classroom
                    </div>
                    <div
                      className="px-4 pb-2 hover:bg-gray-100"
                      onClick={handleOpenModal}>
                      Create Classroom
                    </div>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {topListItems}
            <Divider sx={{ my: 1 }} />
            {middleListItems}
            <Divider sx={{ my: 1 }} />
            {bottomListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <CoursesList/>
        </Box>
        {/* <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Classroom
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <InputAdornment></InputAdornment>
          </Box>
        </Modal> */}
        {/* <FormCreateClass/> */}
      </Box>
    </ThemeProvider>
  );
}
