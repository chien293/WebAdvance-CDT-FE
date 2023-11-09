import ProfileBox from "@/components/profile-page/profileBox";
import avt1 from "../assets/img/avt1.jpg";

const user = {
  name: "Your Name",
  username: "yourusername",
  email: "your@email.com",
  phone: "123-456-7890",
  role: "User",
  avatar: avt1,
};

const Profile = () => {
  return (
    <div>
      <ProfileBox user={user}/>
    </div>
  );
};

export default Profile;