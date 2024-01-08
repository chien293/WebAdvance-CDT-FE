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
import ReviewExamContent from "@/components/class/ReviewExamContent";
import HeaderBar from "@/components/HeaderBar";
import withAuth from "@/auth/with-auth";
const defaultTheme = createTheme();

function Class() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <HeaderBar />
      <div className="grid grid-cols-1 mx-80 gap-4">
        <ReviewExamContent />
      </div>
    </ThemeProvider>
  );
}
export default withAuth(Class, ["student"]);
