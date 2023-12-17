import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  Box,
} from "@mui/material";
import authService from "@/auth/auth-service";
import LinkNext from "next/link";
import Layout from "../components/dashboard-page/Layout";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";

const defaultTheme = createTheme();

export default function Class() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline />
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
        </Drawer> */}
        <HeaderBar />
        <SideBar/>
        {/* <Layout /> */}
      </Box>
    </ThemeProvider>
  );
}
