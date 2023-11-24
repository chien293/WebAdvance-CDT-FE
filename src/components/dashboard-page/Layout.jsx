import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Container,
  Grid,
  Paper,
  List,
  Typography,
  Divider,
} from "@mui/material";

import TabNavigation from "./TabNavigation";
import InfoContent from "./InfoContent";
import TabContent from "./TabContent";
import dynamic from "next/dynamic";
import ParticipantContent from "./ParticipantContent";

export default function Layout() {
  const tabContents = [
    // {
    //   id: "Infomation",
    //   component: dynamic(() => import("./InfoContent")),
    // },
    // {
    //   id: "Exercises",
    //   component: dynamic(() => import("./ExercisesContent")),
    // },
    // {
    //   id: "Participant",
    //   component: dynamic(() => import("./ParticipantContent")),
    // },
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
      <TabNavigation />
      {/* <InfoContent /> */}
      {/* {tabContents.map(({ id, component: TabContentComponent }) => (
        <TabContentComponent key={id} />
      ))} */}
      <div className="flex justify-center">
        <ParticipantContent />
      </div>
    </Box>
  );
}