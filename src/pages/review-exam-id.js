import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  CssBaseline,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useRouter } from "next/router";
import {
  middleListItems,
  bottomListItems,
  topListItems,
} from "../components/dashboard-page/listItems";
import LinkNext from "next/link";
import AvatarDropdown from "@/components/AvatarDropdown";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import ReviewExamContent from "@/components/dashboard-page/ReviewExamContent";

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

export default function Class() {
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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const review = {
    postWriter: "Khanh Huy Nguyen",
    title: "Review the mark again",
    date: "Nov 3",
    content: `Implement the authentication of your project
      Apply a popular authentication library for your project 2 points`,
  };

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
              <Breadcrumbs>
                <BreadcrumbItem></BreadcrumbItem>
                <BreadcrumbItem>Advanced Web Programming</BreadcrumbItem>
              </Breadcrumbs>
            </Typography>
            <LinkNext href="/">
              <Typography sx={{ paddingRight: 5 }}>{currentUser} </Typography>
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
        <ReviewExamContent
          postWriter={review.postWriter}
          title={review.title}
          date={review.date}
          content={review.content}
        />
      </Box>
    </ThemeProvider>
  );
}