import React from "react";
import CoursesInfo from "./CoursesInfo";

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
  );
};

export default CoursesList;
