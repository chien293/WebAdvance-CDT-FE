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
import { useRouter } from "next/router";
import LinkNext from "next/link";
import ReviewExamContent from "@/components/dashboard-page/ReviewExamContent";
import HeaderBar from "@/components/HeaderBar";

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
        <HeaderBar/>
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