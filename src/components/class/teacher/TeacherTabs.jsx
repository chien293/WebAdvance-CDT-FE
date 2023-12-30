import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ParticipantContent from "@/components/class/ParticipantContent";
import InfoContent from "@/components/class/InfoContent";
import Post from "@/components/class/Post";
import Exercise from "@/components/class/Exercise";
import SettingsContent from "@/components/class/SettingsContent";
import GradeBoard from "@/components/class/GradeBoard";
import ReviewExam from "@/components/class/ReviewExam";
import GradeStructureBoard from "@/components/class/GradeStructure";
import GradeBoardStudent from "@/components/class/student/GradeBoardStudent";
import Link from "next/link";
const TeacherTabs = ({ classId, tabs }) => {
  const [value, setValue] = useState("1");
  console.log(value, " TEACHER TABS");
  useEffect(() => {
    if (tabs) setValue(tabs);
  }, [tabs]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "calc(100% - 240px)",
        typography: "body1",
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "white",
        overflowY: "auto",
        top: 0,
        bottom: 0,
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            backgroundColor: "white",
            borderColor: "divider",
            "& .MuiTab-root": { textTransform: "none" },
            position: "fixed",
            width: "calc(100% - 240px)",
            zIndex: 10,
          }}
        >
          <TabList
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "green", // indicatorColor
              },
              "& button": { fontWeight: "bold" },
              "& button:hover": { color: "black", backgroundColor: "#eeeeee" },
              "& button:active": { color: "green" },
              "& button:focus": { color: "green" },
            }}
          >
            <Tab label="Information" value="1" />
            <Tab label="Exercise" value="2" />
            <Tab label="Participant" value="3" />
            <Tab label="Settings" value="4" />
            <Tab label="Grade Structure" value="5" />
            <Tab label="Grade Board" value="6" />
            <Tab label="Checking Examination Papers" value="7" />
          </TabList>
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <TabPanel value="1">
            <InfoContent classId={classId} role="teacher" />
          </TabPanel>
          <TabPanel value="2">
            <Exercise classId={classId} role="teacher" />
          </TabPanel>
          <TabPanel value="3">
            <ParticipantContent classId={classId} role="teacher" />
          </TabPanel>
          <TabPanel value="4">
            <SettingsContent classId={classId} role="teacher" />
          </TabPanel>
          <TabPanel value="5">
            <GradeStructureBoard classId={classId} role="teacher" />
          </TabPanel>
          <TabPanel value="6">
            <GradeBoard classId={classId} role="teacher" />
          </TabPanel>
          <TabPanel value="7">
            <ReviewExam classId={classId} role="teacher" />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default TeacherTabs;
