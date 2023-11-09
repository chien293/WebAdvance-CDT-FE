import React from "react";
import styles from "../../styles/Profile.module.css";

const ProfileBox = ({ user }) => {
  const { avatar, name, username, role, email, phone } = user;
  return (
    <div className={styles.profileBox}>
      <div className={styles.leftBox}>
        <img src={avatar.src} alt="User Avatar" className={styles.avatar} />
        <h2>{name}</h2>
      </div>
      <div className={styles.info}>
        <p>Username: {username}</p>
        <p>Role: {role}</p>
        <p>Email: {email}</p>
        <p>Phone Number: {phone}</p>
      </div>
    </div>
  );
};

export default ProfileBox;
