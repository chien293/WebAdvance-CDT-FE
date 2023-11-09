import React from "react";
import styles from ".../styles/Profile.module.css";

const ProfileBox = ({ user }) => {
  return (
    <div className={styles.profileBox}>
      <div className={styles.leftBox}>
        <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
        <h2>{user.name}</h2>
      </div>
      <div className={styles.info}>
        <p>
          Username: {user.username}
        </p>
        <p>
          Role: {user.role}
        </p>
        <p>
          Email: {user.email}
        </p>
        <p>
          Phone Number: {user.phone}
        </p>
      </div>
    </div>
  );
};

export default ProfileBox;
