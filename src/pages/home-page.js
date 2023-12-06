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
  Modal,
  InputAdornment,
  IconButton,
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
import { useRouter } from "next/navigation";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
  middleListItems,
  bottomListItems,
  topListItems,
} from "../components/dashboard-page/listItems";
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

function HomePage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAddCourseButton, setOpenAddCourseButton] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [openForm, setOpenForm] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.user[0]);
    }
  }, []);

  if (!currentUser) return <Loading />;

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
        <CssBaseline />
        <AppBar position="absolute" open={open} color="success">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
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
              aria-label="add"
            >
              <AddIcon />
            </Fab>
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
              <Typography sx={{ paddingRight: 5 }}>
                {currentUser.fullname}{" "}
              </Typography>
            </LinkNext>

            <AvatarDropdown></AvatarDropdown>
            <Typography variant="title" color="inherit" noWrap>
              &nbsp; &nbsp; &nbsp;
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
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
          }}
        >
          <Toolbar />
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
                      onClick={() => setOpenForm(true)}
                    >
                      Create Classroom
                    </Button>
                  </div>
                </Paper>
              </Fade>
            )}
          </Popper>
          <CoursesList />
        </Box>
        <FormCreateClass
          open={openForm}
          onClose={() => setOpenForm(false)}
          onCancel={() => setOpenForm(false)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default withAuth(HomePage, ["admin", "teacher", "student"]);
