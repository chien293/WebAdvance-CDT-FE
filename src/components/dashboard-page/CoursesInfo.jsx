import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";

const CoursesInfo = ({ name, title, teacher }) => {
  return (
    <div className="flex flex-col relative h-80 w-80 border rounded-lg mt-5 ml-5 max-w-full overflow-hidden hover:drop-shadow-lg">
      <div className="relative w-full h-1/3 bg-green-400">
        <div className="pt-3 px-3">
          <div className="hover:underline truncate font-bold text-2xl">
            {name}
          </div>
          <div className="hover:underline font-medium">{title}</div>
          <div className="hover:underline font-medium">{teacher}</div>
        </div>
        <div class="absolute w-20 h-20 -bottom-10 left-1/2 transform translate-x-3/4 border bg-white rounded-full"></div>
      </div>
      <div className="flex flex-row-reverse absolute bottom-0 w-full h-1/5 border-t items-center">
        <div className="hover:bg-gray-200 rounded-full mr-3 p-2 cursor-pointer">
          <FolderOpenIcon />
        </div>
        <div className="hover:bg-gray-200 rounded-full mr-3 p-2 cursor-pointer">
          <AssignmentIndOutlinedIcon className="" />
        </div>
      </div>
    </div>
  );
};

export default CoursesInfo;
