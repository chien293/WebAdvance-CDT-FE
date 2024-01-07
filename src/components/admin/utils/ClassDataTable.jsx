import React, { useState, useEffect } from 'react';
import {
  GridToolbarContainer, GridToolbarExport, Dialog,
  DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField, Box
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { FaBan, FaCheck } from "react-icons/fa";
import axios from 'axios';
import AuthService from "@/auth/auth-service";
const ClassDataTable = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classData, setClassData] = useState([]);
  const [activeDialog, setActiveDialog] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [token, setToken] = useState('');
  const API_URL = process.env.SERVER_URL;

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    const user = AuthService.getCurrentUser();
    setToken(user.accessToken);
    await axios
      .get(API_URL + "/admin/getClasses", {
        headers: {
          token: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        if (res.data) {
          const clasesData = res.data.map(
            ({ password, image, role, ...rest }) => rest
          );
          setClassData(clasesData);
        }
      });
  };

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

          slots={{
            Toolbar: CustomToolbar,
          }}
          pageSizeOptions={[5, 10, 20]}
          pagination
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
