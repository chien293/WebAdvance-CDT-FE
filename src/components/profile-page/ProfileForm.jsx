import React, { useState } from "react";

const ProfileForm = ({ profileData, handleFormSubmit }) => {
  const [editableData, setEditableData] = useState({ ...profileData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="user-profile-container">
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span className="h-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="tracking-wide">Edit Profile</span>
        </div>
        <div className="text-gray-700">
          <div className="grid md:grid-cols-1 text-md">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold h-10 flex items-center">
                Full Name
              </div>
              <div className="px-4 pb-4">
                <input
                  type="text"
                  name="fullname"
                  value={editableData.fullname}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full h-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold h-10 flex items-center">
                Email
              </div>
              <div className="px-4 pb-4">
                <input
                disabled

                  type="email"
                  name="email"
                  value={editableData.email}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full h-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold h-10 flex items-center">
                Birthday
              </div>
              <div className="px-4 pb-4">
                <input
                  type="date"
                  name="birthday"
                  value={editableData.birthday || ""}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-md w-full h-10"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="justify-self-center block w-auto text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-2"
            onClick={() => handleFormSubmit(editableData)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
