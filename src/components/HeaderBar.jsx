import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
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
  Badge,
  IconButton,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "@mui/material/Popover";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Image, { Label } from "@mui/icons-material";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import axios from "axios";
import LinkNext from "next/link";
import AvatarDropdown from "@/components/AvatarDropdown";
import Layout from "../components/dashboard-page/Layout";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import CoursesList from "@/components/dashboard-page/CoursesList";
import FormCreateClass from "@/components/dashboard-page/FormCreateClass";
import FormCreateEnroll from "@/components/dashboard-page/FormCreateEnroll";
import withAuth from "@/auth/with-auth";
import { useSocket } from "./SocketProvider";

const drawerWidth = 240;
const API_URL = process.env.SERVER_URL;

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

function NotificationIcon({ notiList, token }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (notiList) {
      console.log(notiList, " New list noti");
      setNotifications(notiList);
    }
  }, [notiList]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async () => {
    if (notifications.length > 0) {
      setNotifications(
        notifications.map((notification) => ({ ...notification, read: 1 }))
      );
      await axios.post(
        API_URL + "/class/setReadNotifications",
        {
          notifications: notifications,
        },
        {
          headers: {
            token: "Bearer " + token,
          },
        }
      );
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ marginRight: 15 }}>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge
          badgeContent={
            notifications.filter((notification) => !notification.read).length
          }
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification, index) => (
                <React.Fragment key={index}>
                  <Link href={notification.url}>
                    <ListItem
                      button
                      style={{
                        backgroundColor:
                          notification.read == 1 ? "white" : "#32a852",
                      }}
                    >
                      <ListItemText
                        primary={<b>{notification.title}</b>}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {notification.content}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textSecondary"
                              align="right"
                              display="block"
                            >
                              {notification.createdDay}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </Link>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div>You have no notification.</div>
          )}
        </List>
        <Button onClick={handleMarkAsRead}>Mark as read</Button>
      </Popover>
    </div>
  );
}

const HeaderBar = ({ isHomePage, sharedState }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddCourseButton, setOpenAddCourseButton] = useState(false);
  const [placement, setPlacement] = useState();
  const [openFormCreate, setOpenFormCreate] = useState(false);
  const [openFormEnroll, setOpenFormEnroll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [img, setImg] = useState(null);
  const socket = useSocket();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.user[0].fullname);
      setCurrentToken(user.accessToken);
      setCurrentId(user.user[0].id);
      setImg(user.user[0].image);
    }
    console.log("Shared State changed:", sharedState);
  }, [sharedState]);

  useEffect(() => {
    if (currentUser) {
      getNotifications();
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        const transformedData = data.content.map((notification) => ({
          id: notification.id,
          title: notification.fullname || notification.name,
          url: notification.url,
          content: notification.content,
          createdDay: notification.createdDay,
          read: notification.marked,
        }));
        setNotifications(transformedData);
      });
    }
  }, [socket]);

  const getNotifications = async () => {
    console.log(currentUser, " HEADERBAR");
    await axios
      .post(
        API_URL + "/class/getNotifications",
        {
          idUser: currentId,
        },
        {
          headers: {
            token: "Bearer " + currentToken,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          const transformedNotifications = res.data.map((notification) => ({
            id: notification.id,
            title: notification.fullname || notification.name,
            url: notification.url,
            content: notification.content,
            createdDay: notification.createdDay,
            read: notification.marked,
          }));
          setNotifications(transformedNotifications);
        }
      });
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenAddCourseButton((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="success">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
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
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          )}

          <NotificationIcon notiList={notifications} token={currentToken} />

          <Popper
            open={openAddCourseButton}
            anchorEl={anchorEl}
            // placement={placement}
            placement="bottom"
            sx={{ position: "fixed", boxShadow: "10" }}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper className="mt-4">
                  <div className="px-4 py-2 hover:bg-gray-100">
                    <Button
                      sx={{ border: "none" }}
                      variant="outlined"
                      onClick={() => setOpenFormEnroll(true)}
                    >
                      Enroll Classroom
                    </Button>
                  </div>
                  <div className="px-4 pb-2 hover:bg-gray-100">
                    <Button
                      sx={{ border: "none", textColor: "black" }}
                      variant="outlined"
                      onClick={() => setOpenFormCreate(true)}
                    >
                      Create Classroom
                    </Button>
                  </div>
                </Paper>
              </Fade>
            )}
          </Popper>
          <LinkNext href="/">
            <Typography sx={{ paddingRight: 5 }}>{currentUser} </Typography>
          </LinkNext>
          <AvatarDropdown
            user={currentUser}
            id={currentId}
            img={img}
          ></AvatarDropdown>
          <Typography variant="title" color="inherit" noWrap>
            &nbsp; &nbsp; &nbsp;
          </Typography>
        </Toolbar>
      </AppBar>
      <FormCreateClass
        open={openFormCreate}
        onClose={() => setOpenFormCreate(false)}
        onCancel={() => setOpenFormCreate(false)}
      />
      <FormCreateEnroll
        open={openFormEnroll}
        onClose={() => setOpenFormEnroll(false)}
        onCancel={() => setOpenFormEnroll(false)}
      />
    </Box>
  );
};

export default HeaderBar;
//export default withAuth(HomePage, ["admin", "teacher", "student"]);
