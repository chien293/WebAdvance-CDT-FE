import React from "react";
import CoursesInfo from "./CoursesInfo";
import { Toolbar, Box } from "@mui/material";
import Link from "next/link";

const CoursesList = () => {
  const list = [
    {
      id: 1,
      link: "classid",
      name: "1-CLC-AWP-20KTPM",
      title: "Advanced Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 2,
      link: "classid",
      name: "2-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 3,
      link: "classid",
      name: "3-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 4,
      link: "classid",
      name: "4-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 5,
      link: "classid",
      name: "5-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
  ];
  return (
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
        {list.map((course) => (
          <Link key={course.id} href={course.link} passHref>
            <div>
              <CoursesInfo
                name={course.name}
                title={course.title}
                teacher={course.teacher}
              />
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
};

export default CoursesList;