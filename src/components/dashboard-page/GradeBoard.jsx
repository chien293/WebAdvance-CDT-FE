import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridExcelExportOptions,
} from "@mui/x-data-grid-premium";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "firstName", headerName: "First name", width: 100 },
  { field: "lastName", headerName: "Last name", width: 120 },
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
    lastName: "Tran Van",
    firstName: "B",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 3,
    lastName: "Cao Thi",
    firstName: "C",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 4,
    lastName: "Huynh Tan",
    firstName: "D",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 5,
    lastName: "Ly Thi",
    firstName: "P",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 6,
    lastName: "Le Quoc",
    firstName: "V",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 7,
    lastName: "Vo Thi",
    firstName: "A",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 8,
    lastName: "Nguyen Thi",
    firstName: "S",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 9,
    lastName: "Dinh Van",
    firstName: "H",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
  {
    id: 10,
    lastName: "Dinh Van",
    firstName: "H",
    iE: 10,
    gE: 10,
    midProject: 10,
    seminar: 10,
    finalProject: 10,
    finalGrade: 10,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />      
    </GridToolbarContainer>
  );
}

export default function GradeBoard() {
  return (
    <div
      style={{
        height: 670,
        width: "85%",
        marginLeft: "auto",
        marginRight: "auto",
      }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 10 },
          },
        }}
        pageSizeOptions={[1, 2]}
        checkboxSelection
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
