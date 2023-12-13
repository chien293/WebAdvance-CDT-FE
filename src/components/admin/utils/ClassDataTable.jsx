// components/TeacherDataTable.js
import React, { useState, useEffect } from 'react';
import { GridToolbarContainer, GridToolbarExport, Dialog, 
  DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField, Box } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { FaBan, FaCheck } from "react-icons/fa";

const ClassDataTable = ({  classes, teachers, token }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classData, setClassData] = useState([]);
  const [activeDialog, setActiveDialog] = useState(false);

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
          {params.row.active ? <FaCheck /> : <FaBan />}
        </Button>
      ),
    },
  ];

  const handleClickOpenActive = (teacher) => {
    setSelectedTeacher(teacher);
    setActiveDialog(true);
  };

  const handleCloseActive = () => {
    setActiveDialog(false);
  };

  //Ban or Unban
  const handleActiveSubmit = async () => {

    const newActiveValue = selectedTeacher.active == "1" ? "0" : "1";
    const result = await axios.post(
      API_URL + "/admin/banUsers",
      {
        user: {
          ...selectedTeacher,
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
      prevTeachers.map((teacher) =>
        teacher.id === selectedTeacher.id ? { ...teacher, active: newActiveValue } : teacher
      )
    );
    // Logic for submitting edited information
    //setLoading(false);
    handleCloseActive();
  };


  return (
    <div className="dataTable">
      {classData && classData.length > 0 ? (
        <DataGrid
          rows={classData}
          columns={columns}
          pageSize={5}
          pagination
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
