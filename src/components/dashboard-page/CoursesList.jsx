import React from "react";
import CoursesInfo from "./CoursesInfo";
import { Toolbar, Box } from "@mui/material";
import Link from "next/link";

const CoursesList = ({classData}) => {
  React.useEffect(() => {
    console.log(JSON.stringify(classData) + " CLass data")
  })
  
  return (
    classData ?
    <Box
      component="main"
      sx={{
        marginTop: -10,
        backgroundColor: "white",
        flexGrow: 1,
        height: "100vh",
        overflow: "hidden",
      }}>
      <Toolbar />
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        {classData.map((course) => (
          <Link key={course.id} href={String.toString(course.id)} passHref>
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
    </Box> : <div>You have no class</div>
  );
};

export default CoursesList;