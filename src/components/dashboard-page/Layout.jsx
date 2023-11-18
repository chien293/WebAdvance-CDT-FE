import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  Container,
  Grid,
  Paper,
  List,
  Typography,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image, { Label } from "@mui/icons-material";
import AuthService from "@/auth/auth-service";
import useRouter from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Button } from "@nextui-org/react";
import authService from "@/auth/auth-service";
import LinkNext from "next/link";
import Post from "./Post";
const drawerWidth = 240;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Layout() {

  return (
    <ThemeProvider theme={defaultTheme}>
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

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={8} lg={9}>          
              </Grid> */}
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}>
                  <Chart />
                </Paper>
              </Grid> */}
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={10}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 60,
                }}>
               
              </Paper>
            </Grid> */}
            <Post title="Poll for Upcoming Topics" date="16 thg 11" />
            <Post title="Sample Nest project" date="16 thg 11" />
            <Post title="Final Project Feature list" date="16 thg 11" />
            <Post
              title="Midterm project (Deadline Nov 15 10pm)"
              date="13 thg 11"
            />
            <Post title="Simple JWT auth with Nest" date="13thg 11" />
            <Post title="Midterm Project" date="3 thg 11" />
            {/* Recent Orders */}
            {/* <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders />
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
