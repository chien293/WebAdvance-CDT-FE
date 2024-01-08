import React from "react";
import { Avatar } from "@nextui-org/react";
const Comment = ({ image, userName, date, content }) => {
  return (
    <div className="flex m-2">
      <Avatar src={image} />
      <div className="h-10 w-10"></div>
      <div className="flex flex-col">
        <div>
          <span className="mr-2 font-bold">{userName}</span>
          <span className="text-xs">{date}</span>
        </div>
        <div>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
