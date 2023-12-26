import React from "react";
import SelectTopic from "../dashboard-page/SelectTopic";

const Exercise = () => {
  const teachers = [
    { id: 1, name: "Khanh Huy Nguyen" },
    { id: 2, name: "Tuan Mai Anh" },
  ];
  const students = [
    { id: 1, name: "Tran Dam Gia Huy" },
    { id: 2, name: " Vu Hoang Anh" },
    { id: 3, name: "Toan Banh Hao" },
  ];

  return (
    <div className="flex flex-col w-6/12 font-medium">
      <div className="">Your Exercise</div>
      <SelectTopic />
    </div>
  );
};

export default Exercise;
