// components/TeacherDataTable.js
import React, { useState, useEffect } from 'react';
import {
  GridToolbarContainer, GridToolbarExport, Dialog,
  DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField, Box
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { FaBan, FaCheck } from "react-icons/fa";
import axios from 'axios';

const ClassDataTable = ({ classes, teachers, token }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classData, setClassData] = useState([]);
  const [activeDialog, setActiveDialog] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const API_URL = process.env.SERVER_URL;

  useEffect(() => {
    if (classes.length > 0 && teachers.length > 0) {
      // Map over the classes and replace createdBy id with fullname
      const updatedClassData = classes.map((classItem) => {
        const createdByTeacher = teachers.find(
          (teacher) => teacher.id === classItem.createdBy
        );
        return {
          ...classItem,
          createdBy: createdByTeacher ? createdByTeacher.fullname : classItem.createdBy,
        };
      });

      setClassData(updatedClassData);
    }
  }, [classes, teachers]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Class Name', width: 200 },
    { field: 'createdBy', headerName: 'Created By', width: 150 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'topic', headerName: 'Topic', width: 150 },
    { field: 'room', headerName: 'Room', width: 150 },
    {
      field: 'active',
      headerName: 'Active',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleClickOpenActive(params.row)}>
          {params.row.active == "1" ? <FaCheck /> : <FaBan />}
        </Button>
      ),
    },
  ];

  const handleClickOpenActive = (data) => {
    setSelectedClass(data);
    setActiveDialog(true);
  };

  const handleCloseActive = () => {
    setActiveDialog(false);
  };

  //Ban or Unban
  const handleActiveSubmit = async () => {

    const newActiveValue = selectedClass.active == "1" ? "0" : "1";
    const result = await axios.post(
      API_URL + "/admin/activeClass",
      {
        data: {
          ...selectedClass,
          active: newActiveValue,
        },
      },
      {
        headers: {
          token: "Bearer " + token,
        },
      }
    );

    setClassData((prevTeachers) =>
      prevTeachers.map((value) =>
        value.id == selectedClass.id ? { ...value, active: newActiveValue } : value
      )
    );

    //setLoading(false);
    handleCloseActive();
  };


  return (
    <div className="dataTable">
      {classData && classData.length > 0 ? (
        <DataGrid
          rows={classData}
          columns={columns}
          initialState={{
            ...classData.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          rowsPerPageOptions={[5, 10, 20]}
          slots={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={(newSelection) => {
            console.log(newSelection);
          }}
        />
      ) : (
        <p>No classes available.</p>
      )}
      <Dialog open={activeDialog} onClose={handleCloseActive}>
        <DialogTitle>Ban or Unban Teacher</DialogTitle>
        <DialogContent>
          {/* Edit form fields */}
          <DialogContentText >
            You want to {selectedClass ? (selectedClass.active == 1 ? "ban" : "unban") : ''} {selectedClass ? selectedClass.fullname : ''}
          </DialogContentText>
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActive}>Cancel</Button>

          <Button onClick={handleActiveSubmit} color="primary">Save</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
};

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default ClassDataTable;
