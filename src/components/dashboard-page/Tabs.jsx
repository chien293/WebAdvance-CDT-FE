import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ParticipantContent from "./ParticipantContent";
import InfoContent from "./InfoContent";
import Post from "./Post";
import Exercise from "./Exercise";
import SettingsContent from "./SettingsContent";
import GradeBoard from "./GradeBoard";
import ReviewExam from "./ReviewExam";
import GradeStructureBoard from "./GradeStructure";
export default function LabTabs(props) {
  const [value, setValue] = React.useState("1");

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
      }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            // backgroundColor: "red",
            borderColor: "divider",
            "& .MuiTab-root": { textTransform: "none" },
          }}>
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
            }}>
            <Tab label="Information" value="1" />
            <Tab label="Exercise" value="2" />
            <Tab label="Participant" value="3" />
            <Tab label="Settings" value="4" />
            <Tab label="Grade Structure" value="5" />
            <Tab label="Grade Board" value="6" />
            <Tab label="Checking Examination Papers" value="7" />
          </TabList>
        </Box>
        <Box
          sx={{
   
          }}>
          <TabPanel value="1">
            <InfoContent classId={props.classId} />
          </TabPanel>
          <TabPanel value="2">
            <Exercise classId={props.classId} />
          </TabPanel>
          <TabPanel value="3">
            <ParticipantContent classId={props.classId} />
          </TabPanel>
          <TabPanel value="4">
            <SettingsContent classId={props.classId} />
          </TabPanel>
          <TabPanel value="5">
            <GradeStructureBoard classId={props.classId} />
          </TabPanel>
          <TabPanel value="6">
            <GradeBoard classId={props.classId} />
          </TabPanel>
          <TabPanel value="7">
            <ReviewExam classId={props.classId} />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
