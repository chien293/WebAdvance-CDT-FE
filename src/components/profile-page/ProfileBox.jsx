import React from "react";

const ProfileBox = ({ user, onEditClick }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <img src={} alt="Avatar" className="w-32 h-32 rounded-full" /> */}
      <h1 className="text-2xl font-bold mt-4">{user.fullname}</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-lg">{user.email}</p>
        {/* <p className="text-lg">{user.address}</p> */}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={onEditClick}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileBox;
