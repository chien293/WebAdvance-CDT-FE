import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import ArchiveIcon from "@mui/icons-material/Archive";
import SettingsIcon from "@mui/icons-material/Settings";
import CoursesList from "./dashboard-page/CoursesList";
import Tabs from "./dashboard-page/Tabs";
import StudentIdDataTable from "./admin/utils/StudentIdTable";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const SideBar = ({ setCurrentSelection }) => {
  
  return (
    <Drawer variant="permanent">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          width: "240px",
        }}>
        <IconButton
        // onClick={toggleDrawer}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <Link
          href="/home-page"
          onClick={() => {setCurrentSelection("Home");    
          }}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={() => setCurrentSelection("MapID")}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="MapID" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={() => setCurrentSelection("Registered")}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Registered" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={() => setCurrentSelection("Archived class")}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archived class" />
        </ListItemButton>
        <ListItemButton onClick={() => setCurrentSelection("Settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SideBar;
