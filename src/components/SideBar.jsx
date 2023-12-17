import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";
import ArchiveIcon from "@mui/icons-material/Archive";
import SettingsIcon from "@mui/icons-material/Settings";
import CoursesList from "./dashboard-page/CoursesList";
import Tabs from "./dashboard-page/Tabs";

const SideBar = () => {
  const [value, setValue] = useState("1"); // Initial selected tab value

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        marginTop: 8,
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}>
      <TabContext value={value}>
        <div className="flex">
          <List component="nav" sx={{ borderRightWidth: 1, width: "240px" }}>
            <ListItemButton onClick={() => handleChange(null, "1")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => handleChange(null, "2")}>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="MapID" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={() => handleChange(null, "3")}>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Registered" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={() => handleChange(null, "4")}>
              <ListItemIcon>
                <ArchiveIcon />
              </ListItemIcon>
              <ListItemText primary="Archived class" />
            </ListItemButton>
            <ListItemButton onClick={() => handleChange(null, "5")}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
          <div style={{ flex: 1 }}>
            <TabPanel value="1">
              {/* Content for Home tab */}
              <CoursesList />
            </TabPanel>
            <TabPanel value="2">
              {/* Content for MapID tab */}
              <h2>MapID Content</h2>
            </TabPanel>
            <TabPanel value="3">
              {/* Content for Registered tab */}
              <h2>Registered Content</h2>
            </TabPanel>
            <TabPanel value="4">
              {/* Content for Archived class tab */}
              <Tabs />
            </TabPanel>
            <TabPanel value="5">
              {/* Content for Settings tab */}
              <h2>Settings Content</h2>
            </TabPanel>
          </div>
        </div>
      </TabContext>
    </Box>
  );
};

export default SideBar;