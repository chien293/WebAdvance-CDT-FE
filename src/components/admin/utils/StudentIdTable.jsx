
// components/TeacherDataTable.js
import React, { useState } from 'react';
import {
  GridToolbarContainer, GridToolbarExport, Dialog,
  DialogTitle, DialogContent, DialogActions, DialogContentText,
  Button, TextField, CircularProgress, Box
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { FaBan, FaCheck } from "react-icons/fa";
import axios from 'axios';
import authService from '@/auth/auth-service';

const StudentIdDataTable = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loadingActive, setLoading] = useState(false);
  const [listIdsData, setListIdsData] = useState(null);
  const [currentId, setId] = useState(null);

  const API_URL = process.env.SERVER_URL;

  React.useEffect(() => {
      getStudentIds();
    
  }, [])

  const getStudentIds = async () => {
    const currentUser = authService.getCurrentUser();
    setId(currentUser.user[0].id)
    await axios
      .get(API_URL + "/getStudentIds", {
        headers: {
          token: "Bearer " + currentUser.accessToken,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          const idsData = res.data
          setListIdsData(idsData);
          //setIsLoaded(true);
        } else {
          setListIdsData([]);
        }
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'idstudent', headerName: 'Student Id', width: 200 },
    {
      field: 'active',
      headerName: 'Active',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleClickOpenActive(params.row)}>
            <FaCheck />
          </Button>
        </div>
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

  //Submit choose Id
  const handleActiveSubmit = async () => {

    const newActiveValue = selectedTeacher.accountId;
    const result = await axios.post(
      API_URL + "/setStudentId",
      {
        user: {
          ...selectedTeacher,
          userId: newActiveValue,
        },
      },
      {
        headers: {
          token: "Bearer " + token,
        },
      }
    );

    //setLoading(false);
    handleCloseActive();
  };

  return (
    <div className="studentIdsDataTable ml-20 mt-20 w-full">
      {listIdsData && listIdsData.length > 0 ? (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={listIdsData}
            columns={columns}
            initialState={{
              ...listIdsData.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}

            slots={{
              Toolbar: CustomToolbar,
            }}
            pageSizeOptions={[5]}

          />
        </div>
      ) : (
        <p>No ids available.</p>
      )}

      <Dialog open={activeDialog} onClose={handleCloseActive}>
        <DialogTitle>Ban or Unban Teacher</DialogTitle>
        <DialogContent>
          <DialogContentText >
            You want to map {selectedTeacher ? selectedTeacher.studentId : ''} to your account ?
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

export default StudentIdDataTable;