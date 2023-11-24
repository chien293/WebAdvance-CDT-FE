import React from "react";

const TabContent = ({ id, content, isActive }) => {
  return (
    <div id={id} className={`tabcontent ${isActive ? "active" : ""}`}>
      <p>{content}</p>
    </div>
  );
};

export default TabContent;