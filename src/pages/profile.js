import * as React from "react";
import authService from "@/auth/auth-service";
import axios from "axios";
import Layout from "@/components/dashboard-page/Layout";
import Loading from "@/components/Loading";
import AuthService from "@/auth/auth-service";
import withAuth from "@/auth/with-auth";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import HeaderBar from "@/components/HeaderBar";
import ProfileBox from "@/components/profile-page/Profile";
import SideBar from "@/components/SideBar";

const defaultTheme = createTheme();

const Profile = () => {
  const [currentUser, setCurrentUser] = React.useState(null);

  const [sharedState, setSharedState] = React.useState(null);

  const updateSharedState = (newValue) => {
    setSharedState(newValue);
  };

  React.useEffect(() => {
    const takeUser = () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user.user[0]);
      }
    };
    takeUser();
  }, []);

  if (!currentUser) return <Loading />;

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="grid grid-cols-1">
        <HeaderBar sharedState={sharedState} />
        <div className="flex">
          <div className="w-1/5">
            <SideBar studentClass={[]} teacherClass={[]} isNotHomePage={true} />
          </div>
          <div className="w-4/5 mt-20">
            <ProfileBox
              user={currentUser}
              updateSharedState={updateSharedState}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default withAuth(Profile, ["admin", "user"]);
