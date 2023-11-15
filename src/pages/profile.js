import ProfileBox from "@/components/profile-page/ProfileBox";
import avt1 from "../assets/img/avt1.jpg";
import EditProfile from "@/components/profile-page/EditProfile";
import * as React from "react";
import authService from "@/auth/auth-service";
import axios from "axios";
import Layout from "@/components/dashboard-page/Layout";
const Profile = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
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
        .get(`http://localhost:5000/getUser/${id}`, {
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

  React.useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user.user[0]);
  }, [isEdit]);

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

export default Profile;
