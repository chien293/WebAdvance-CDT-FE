import React, { useState } from "react";
import { Toolbar, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Checkbox, Button } from "@mui/material";

const ReviewExamContent = ({ postWriter, title, date, content }) => {
  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.lastName || ""} ${params.row.firstName || ""}`,
    },
    {
      field: "iE",
      headerName: "Individual Exercises",
      type: "number",
      width: 140,
    },
    {
      field: "gE",
      headerName: "Group Exercises",
      type: "number",
      width: 150,
    },
    {
      field: "midProject",
      headerName: "Midterm Project",
      type: "number",
      width: 150,
    },
    {
      field: "seminar",
      headerName: "Seminar",
      type: "number",
      width: 100,
    },
    {
      field: "finalProject",
      headerName: "Final Project",
      type: "number",
      width: 120,
    },
    {
      field: "finalGrade",
      headerName: "Final Grade",
      type: "number",
      width: 120,
    },
  ];

  const rows = [
    {
      id: 1,
      type: "Initial point",
      lastName: "Nguyen Van",
      firstName: "A",
      iE: 10,
      gE: 10,
      midProject: 10,
      seminar: 10,
      finalProject: 10,
      finalGrade: 10,
    },
    {
      id: 2,
      type: "Desired point",
      lastName: "Nguyen Van",
      firstName: "A",
      iE: 10,
      gE: 10,
      midProject: 10,
      seminar: 10,
      finalProject: 10,
      finalGrade: 10,
    },
    {
      id: 3,
      type: "Review point",
      lastName: "Nguyen Van",
      firstName: "A",
      iE: 10,
      gE: 10,
      midProject: 10,
      seminar: 10,
      finalProject: 10,
      finalGrade: 10,
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowSelection = (rowId) => {
    setSelectedRow(rowId === selectedRow ? null : rowId);
    console.log(rowId);
  };

  const handleButtonClick = () => {
    // Perform your action when the button is clicked
    // Access the data for the selected row using `data[selectedRow]`
    if (selectedRow !== null) {
      console.log("Selected row data:", data[selectedRow]);
    }
  };

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
      <div className="flex flex-col items-center justify-center self-center">
        <div className="mt-4">
          <div className="">
            <span className="text-4xl text-green-600 font-medium">{title}</span>
            <div className="flex flex-row">
              <span className="mr-5">{postWriter}</span>
              <span>{date}</span>
            </div>
          </div>
          <Divider
            style={{
              backgroundColor: "green",
              height: "2px",
              marginTop: "20px",
              marginBottom: "20px ",
            }}
          />
          <div className="mb-4">{content}</div>
          {/* <DataGrid
            rows={rows}
            columns={columns}
            // initialState={{
            //   pagination: {
            //     paginationModel: { page: 0, pageSize: 8 },
            //   },
            // }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          /> */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Option</TableCell>
                  <TableCell align="right">Full Name</TableCell>
                  <TableCell align="right">Individual Exercises</TableCell>
                  <TableCell align="right">Group Exercises</TableCell>
                  <TableCell align="right">Midterm Project</TableCell>
                  <TableCell align="right">Seminar</TableCell>
                  <TableCell align="right">Final Project</TableCell>
                  <TableCell align="right">Final Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <Checkbox
                        checked={index === selectedRow}
                        onChange={() => handleRowSelection(index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {row.lastName} {row.firstName}
                    </TableCell>
                    <TableCell align="right">{row.iE}</TableCell>
                    <TableCell align="right">{row.gE}</TableCell>
                    <TableCell align="right">{row.midProject}</TableCell>
                    <TableCell align="right">{row.seminar}</TableCell>
                    <TableCell align="right">{row.finalProject}</TableCell>
                    <TableCell align="right">{row.finalGrade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="success"
            onClick={handleButtonClick}
            disabled={selectedRow === null}
            style={{ marginTop: "16px", color: "black" }}>
            Select
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default ReviewExamContent;
