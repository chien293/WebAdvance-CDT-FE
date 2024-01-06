import React from "react";
import CoursesInfo from "./CoursesInfo";
import { Toolbar, Box } from "@mui/material";
import Link from "next/link";

const CoursesList = ({ classData }) => {
  return classData ? (
    <div className="flex flex-wrap w-full">
      {classData.map((course) => (
        <div key={course.id}>
          <CoursesInfo
            id={course.id}
            name={course.name}
            title={course.title}
            teacher={course.name}
            role={course.role}
            image={course.image}
          />
        </div>
      ))}
    </div>
  ) : (
    <div>You have no class</div>
  );
};

export default CoursesList;
