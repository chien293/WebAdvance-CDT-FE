import * as React from "react";
import Link from "@mui/material/Link";
import { Typography, Grid, Paper } from "@mui/material";
import Title from "./Title";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

export default function Post({title, date}) {
  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={10}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            height: 80,
            cursor: "pointer",
            ":hover": { backgroundColor: "#ebffef"}            
          }}>
          <div className="p-2 m-1 rounded-3xl bg-green-600">
            <ClassOutlinedIcon
              style={{ color: "white" }}
              // sx={{ display: "inline-flex" }}
            />
          </div>
          <div className="ml-5">
            <Typography>
              Khanh Huy Nguyen posted a new document: {title}{" "}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              {date}
            </Typography>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}