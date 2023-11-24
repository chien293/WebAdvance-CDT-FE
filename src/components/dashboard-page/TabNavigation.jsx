import Link from "next/link";
import React, { useState } from "react";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("Infomation");

  const openTab = (tabName) => {
    // // Hide all tab content
    // const tabContents = document.getElementsByClassName("tabcontent");
    // for (let i = 0; i < tabContents.length; i++) {
    //   tabContents[i].style.display = "none";
    // }

    // Set the selected tab as active
    setActiveTab(tabName);

    // Show the selected tab content
    // document.getElementById(tabName).style.display = "block";
  };

  return (
    <div className="flex w-full bg-white border-b h-12 items-center font-medium text-slate-500">
      {/* <div className="flex w-4/12 font-medium text-slate-500 justify-around"> */}
      <div className="flex justify-center hover:text-black hover:bg-gray-100 px-4 py-4 ml-4">
        <Link
          href="/home-page/infomation"
          className={`tablink ${activeTab === "Infomation" ? "active" : ""}`}
          onClick={() => openTab("Infomation")}>
          Infomation
        </Link>
      </div>
      <div className="flex justify-center hover:text-black hover:bg-gray-100 px-4 py-4">
        <Link
          href="/home-page/exercises"
          className={`tablink ${activeTab === "Exercises" ? "active" : ""}`}
          onClick={() => openTab("Exercises")}>
          Exercises
        </Link>
      </div>
      <div className="flex justify-center hover:text-black hover:bg-gray-100 px-4 py-4">
        <Link
          href="/home-page/participant"
          className={`tablink ${activeTab === "Contact" ? "active" : ""}`}
          onClick={() => openTab("Contact")}>
          Participant
        </Link>
      </div>
      <div className="flex justify-center hover:text-black hover:bg-gray-100 px-4 py-4">
        <Link
          href="/home-page/settings"
          className={`tablink ${activeTab === "Settings" ? "active" : ""}`}
          onClick={() => openTab("Settings")}>
          Settings
        </Link>
      </div>
      {/* </div> */}
    </div>
  );
};

export default TabNavigation;
