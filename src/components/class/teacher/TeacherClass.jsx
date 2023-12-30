import NestedList from "@/components/dashboard-page/NestedList";
import CoursesList from "@/components/dashboard-page/CoursesList";
import StudentIdDataTable from "@/components/admin/utils/StudentIdTable";
import Tabs from "@/components/class/teacher/TeacherTabs";
import { Box, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

const TeacherClass = ({
  currentSelection,
  studentClass,
  teacherClass,
  id,
  role,
  tabs,
}) => {
  return (
    <Box sx={{ marginLeft: "240px", backgroundColor: "white", height: "100%" }}>
      {currentSelection === "Tabs" && (
        <Tabs classId={id} role={role} tabs={tabs} />
      )}
    </Box>
  );
};

export default TeacherClass;
