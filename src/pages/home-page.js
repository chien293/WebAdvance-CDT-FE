import React, {useState} from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthService from "@/auth/auth-service";
import { useRouter } from "next/router";
import LinkNext from "next/link";
import CoursesList from "@/components/dashboard-page/CoursesList";
import withAuth from "@/auth/with-auth";
import { set } from "react-hook-form";
import HeaderBar from "@/components/HeaderBar";
import SideBar from "@/components/SideBar";
import Loading from "@/components/Loading";
// import StudentIdDataTable from "./admin/utils/StudentIdTable";

const defaultTheme = createTheme();

function HomePage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [placement, setPlacement] = React.useState();
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const takeUser = () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user.user[0].fullname);
      }
    };

    takeUser();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenAddCourseButton((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [currentSelection, setCurrentSelection] = useState("Home"); // default selection

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <HeaderBar isHomePage={true} />
        <Box sx={{ flexGrow: 1 }}>
          <SideBar setCurrentSelection={setCurrentSelection} />
          {/* layout section */}
          <Box sx={{ marginLeft: "240px", marginTop: "100px" }}>
            {currentSelection === "Home" && <CoursesList />}
            {currentSelection === "MapID" && (
              <div>Map ID content</div>
            // <StudentIdDataTable />
            )}
            {currentSelection === "Registered" && <div>Registered Content</div> }
            {currentSelection === "Archived class" && (
              <div>Archived Class Content Here</div>
            )}
            {currentSelection === "Setting" && <div>Settings Content Here</div>}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// export default withAuth(HomePage, ["admin", "user"]);
export default HomePage;
