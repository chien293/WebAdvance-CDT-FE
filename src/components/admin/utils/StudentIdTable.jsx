import React, { useState, useEffect } from 'react';
import {
  GridToolbarContainer, GridToolbarExport, Dialog,
  DialogTitle, DialogContent, DialogActions, DialogContentText,
  Button, TextField, CircularProgress, Box, Typography
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { FaBan, FaCheck } from "react-icons/fa";
import axios from 'axios';
import authService from '@/auth/auth-service';

const StudentIdDataTable = ({classId}) => {
  const [activeDialog, setActiveDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
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
      .post(API_URL + `/getStudentId`, 
      {
        id: currentUser.user[0].id,
        classId: classId
      },
      {
        headers: {
          token: "Bearer " + currentUser.accessToken,
        },
      }).then((res) => {
        if (res.data) {
          setStudentId(res.data[0].studentId)
        }     
      })
  }


  const handleClickOpenActive = () => {
    setActiveDialog(true);
  };

  const handleCloseActive = () => {
    setActiveDialog(false);
  };

  //Submit choose Id
  const handleActiveSubmit = async () => {
    const currentUser = authService.getCurrentUser();
    const newActiveValue = selectedTeacher;
    const result = await axios.post(
      API_URL + "/setStudentId",
      {
        id: selectedTeacher,
        idUser: currentId,
        idClass: classId
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
    (<div className="ml-20 mt-20 w-full">
      Your student id is {studentId}
    </div>)
    :
    (
      <div className="ml-20 mt-20 w-full">
        <div style={{ height: 400, width: '100%' }}>
          <Typography>
            Input your Student ID:
          </Typography>
          <TextField value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} />
          <Button style={{ height: 50, width: 20 }} onClick={() => handleClickOpenActive()}>
            <FaCheck />
          </Button>
        </div>

        <Dialog open={activeDialog} onClose={handleCloseActive}>
          <DialogTitle>Map Student Id</DialogTitle>
          <DialogContent>
            <DialogContentText >
              Do you want to map {selectedTeacher ? selectedTeacher : ''} to your account ?
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

export default StudentIdDataTable;