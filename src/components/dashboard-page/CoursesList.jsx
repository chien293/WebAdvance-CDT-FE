import React from "react";
import CoursesInfo from "./CoursesInfo";
import { Toolbar, Box } from "@mui/material";
import Link from "next/link";

const CoursesList = ({ classData }) => {
  const [isStudent, setIsStudent] = React.useState(null);
  const [newClassData, setNewClassData] = React.useState(null);

  React.useEffect(() => {
    console.log(JSON.stringify(classData) + " CLass data");
  });

  return classData ? (
    <div className="flex flex-wrap w-full min-h-screen">
      {classData.map((course) => (
        <Link
          key={course.id}
          href={
            (course.role === "teacher" ? "/teacher/class/" : "student/class/") +
            course.id
          }
          passHref>
          <div>
            <CoursesInfo
              name={course.name}
              title={course.title}
              teacher={course.name}
            />
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div>You have no class</div>
  );
};

export default CoursesList;
