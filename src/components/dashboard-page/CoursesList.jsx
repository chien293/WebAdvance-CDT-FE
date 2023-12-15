import React from "react";
import CoursesInfo from "./CoursesInfo";
import { 
  Toolbar,
  Box,
} from "@mui/material";

const CoursesList = () => {
  const list = [
    {
      id: 1,
      name: "1-CLC-AWP-20KTPM",
      title: "Advanced Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 2,
      name: "2-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 3,
      name: "3-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 4,
      name: "4-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
    {
      id: 5,
      name: "5-CLC-AWP-21KTPM",
      title: "Web Programming",
      teacher: "Khanh Huy Nguyen",
    },
  ];
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}>
      <Toolbar />
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
        {list.map((course) => (
          <CoursesInfo
            key={course.id}
            name={course.name}
            title={course.title}
            teacher={course.teacher}
          />
        ))}
      </div>
    </Box>
  );
};

export default CoursesList;
