import ProfileBox from "@/components/profile-page/ProfileBox";
import avt1 from "../assets/img/avt1.jpg";
import EditProfile from "@/components/profile-page/EditProfile";
import * as React from "react";
import authService from "@/auth/auth-service";
import axios from "axios";
import Layout from "@/components/dashboard-page/Layout";
import Loading from "@/components/Loading";
import AuthService from "@/auth/auth-service";
import withAuth from "@/auth/with-auth";
const Profile = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const URL = process.env.SERVER_URL;
  React.useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.user[0]);
    }
  }, []);

  if (!currentUser) return <Loading />;

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleCancelClick = () => {
    setIsEdit(false);
  };

  const handleUpdateUser = async (userId) => {
    try {
      const user1 = await authService.getCurrentUser();
      const id = user1.user[0].id;
      const fetch = await axios
        .get(URL + "/" + { $id }, {
          headers: {
            token: "Bearer " + user1.accessToken,
          },
        })
        .then((res) => {
          console.log(res.data[0]);
          setCurrentUser(res.data[0]);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {currentUser && (
        <Layout currentUser={currentUser}>
          {currentUser &&
            (isEdit ? (
              <EditProfile
                user={currentUser}
                onCancelClick={handleCancelClick}
                onUpdateData={handleUpdateUser}
              />
            ) : (
              <ProfileBox user={currentUser} onEditClick={handleEditClick} />
            ))}
        </Layout>
      )}
    </div>
  );
};

export default withAuth(Profile, ["admin", "teacher", "student"]);
