import React, { useState, useEffect } from 'react';
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
  const [activeDialog, setActiveDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [listIdsData, setListIdsData] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const API_URL = process.env.SERVER_URL;

  useEffect(() => {
    checkStudentId();
    
  }, [])

  const checkStudentId = async () => {
    const currentUser = authService.getCurrentUser();
    setCurrentId(currentUser.user[0].id);
    await axios
      .get(API_URL + `/getStudentId/${currentUser.user[0].id}`, {
        headers: {
          token: "Bearer " + currentUser.accessToken,
        },
      }).then((res) => {
        if (res.data) {
          setStudentId(res.data[0].idstudent)   
        }
        else{
          getStudentIds();
        }
      })
  }
  const getStudentIds = async () => {
    const currentUser = authService.getCurrentUser();
    await axios
      .get(API_URL + "/getStudentIds", {
        headers: {
          token: "Bearer " + currentUser.accessToken,
        },
      })
      .then((res) => {
        if (res.data) {
          const idsData = res.data
          setListIdsData(idsData);
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

  const handleClickOpenActive = (data) => {
    setSelectedTeacher(data);
    setActiveDialog(true);
  };

  const handleCloseActive = () => {
    setActiveDialog(false);
  };

  //Submit choose Id
  const handleActiveSubmit = async () => {
    const currentUser = authService.getCurrentUser();
    const newActiveValue = selectedTeacher.idstudent;
    const result = await axios.post(
      API_URL + "/setStudentId",
      {
        id: selectedTeacher.id,     
        idUser: currentId,     
      },
      {
        headers: {
          token: "Bearer " + currentUser.accessToken,
        },
      }
    );

    setStudentId(newActiveValue)
    handleCloseActive();
  };

  return (studentId ?
    (<div className=" ml-20 mt-20 w-full"> 
      Your student id is {studentId}
    </div>)
    :
    (
      <div className="studentIdsDataTable ml-20 mt-20 w-full">
        {listIdsData && listIdsData.length > 0 ? (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={listIdsData}
              columns={columns}
              initialState={{
                ...listIdsData.initialState,
                pagination: { paginationModel: { pageSize: 5 } },
              }}

              slots={{
                Toolbar: CustomToolbar,
              }}
              pageSizeOptions={[5, 10, 20]}

            />
          </div>
        ) : (
          <p>No ids available.</p>
        )}

        <Dialog open={activeDialog} onClose={handleCloseActive}>
          <DialogTitle>Map Student Id</DialogTitle>
          <DialogContent>
            <DialogContentText >
              Do you want to map {selectedTeacher ? selectedTeacher.idstudent : ''} to your account ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseActive}>Cancel</Button>

            <Button onClick={handleActiveSubmit} color="primary">Save</Button>

          </DialogActions>
        </Dialog>
      </div>
    )
  )
};

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default StudentIdDataTable;