import React, { useState } from "react";
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
  Collapse,
} from "@mui/material";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import ArchiveIcon from "@mui/icons-material/Archive";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
const SideBar = ({ setCurrentSelection, studentClass, teacherClass }) => {
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);

  const handleClickStudent = () => {
    setOpenStudent(!openStudent);
  };
  const handleClickTeacher = () => {
    setOpenTeacher(!openTeacher);
  };

  return (
    <Drawer variant="permanent">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
          width: "240px",
        }}
      >
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <Link
          href="/home-page"
          onClick={() => {
            setCurrentSelection("Home");
          }}
        >
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
        <ListItemButton onClick={handleClickTeacher}>
          <ListItemIcon>
            {openTeacher ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary="Teaching" />
        </ListItemButton>
        <Collapse in={openTeacher} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {teacherClass.map((item) => (
              <Link
                key={item.id}
                href={{
                  pathname: `/teacher/class/${item.id}`,
                }}
              >
                <ListItemButton style={{ marginLeft: 30 }} key={item.id}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
        <Divider sx={{ my: 1 }} />
        <ListItemButton onClick={handleClickStudent}>
          <ListItemIcon>
            {openStudent ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary="Enrolled" />
        </ListItemButton>
        <Collapse in={openStudent} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {studentClass.map((item) => (
              <Link
                key={item.id}
                href={{
                  pathname: `/student/class/${item.id}`,
                }}
              >
                <ListItemButton style={{ marginLeft: 30 }} key={item.id}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
        {/* <ListItemButton onClick={() => setCurrentSelection("Settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItemButton> */}
      </List>
    </Drawer>
  );
};

export default SideBar;
