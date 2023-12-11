// components/TeacherDataTable.js
import React, { useState } from 'react';
import {
  GridToolbarContainer, GridToolbarExport, Dialog,
  DialogTitle, DialogContent, DialogActions, DialogContentText,
  Button, TextField, CircularProgress
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { FaBan, FaCheck } from "react-icons/fa";
import axios from 'axios';

const TeacherDataTable = ({ teachers, token }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loadingActive, setLoading] = useState(false);
  const [teachersData, setTeachers] = useState(null);
  
  const API_URL = process.env.SERVER_URL;

  React.useEffect(() => {
    if (teachers) {
      setTeachers(teachers);
    }
  }, [teachers])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fullname', headerName: 'Họ tên', width: 150 },
    {
      field: 'active',
      headerName: 'Active',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button onClick={() => handleClickOpenActive(params.row)}>
            {params.row.active == "1" ? <FaCheck /> : <FaBan />}
          </Button>
          {loadingActive && selectedTeacher && selectedTeacher.id === params.row.id && (
            <CircularProgress size={24} />
          )}
        </div>
      ),
    },
    { field: 'verified', headerName: 'Xác thực', width: 100 },
    {
      field: 'edit',
      headerName: 'Chỉnh sửa',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleEditClick(params.row)}
        >
          <EditIcon />
        </Button>
      ),
    },
  ];

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSubmit = () => {
    // Logic for submitting edited information
    handleEditDialogClose();
  };

  const handleClickOpenActive = (teacher) => {
    setSelectedTeacher(teacher);
    setActiveDialog(true);
  };

  const handleCloseActive = () => {
    setActiveDialog(false);
  };

  const handleActiveSubmit = async () => {
    handleCloseActive();
    setLoading(true);
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
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === selectedTeacher.id ? { ...teacher, active: newActiveValue } : teacher
      )
    );
    // Logic for submitting edited information
    setLoading(false);
  };

  return (
    <div className="dataTable">
      {teachersData && teachersData.length > 0 ? (
        <DataGrid
          rows={teachersData}
          columns={columns}
          pageSize={5}
          pagination
          rowsPerPageOptions={[5, 10, 20]}
          slots={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={(newSelection) => {
            console.log(newSelection);
          }}
        />
      ) : (
        <p>No teachers available.</p>
      )}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Chỉnh sửa thông tin giáo viên</DialogTitle>
        <DialogContent>
          {/* Edit form fields */}
          <TextField
            label="Họ tên"
            fullWidth
            value={selectedTeacher ? selectedTeacher.fullname : ''}
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Hủy</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* active */}
      <Dialog open={activeDialog} onClose={handleCloseActive}>
        <DialogTitle>Chỉnh sửa thông tin giáo viên</DialogTitle>
        <DialogContent>
          {/* Edit form fields */}
          <DialogContentText >
            You want to ban {selectedTeacher ? selectedTeacher.fullname : ''}
          </DialogContentText>
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActive}>Hủy</Button>
          <Button onClick={handleActiveSubmit} color="primary">
            Lưu
          </Button>
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

export default TeacherDataTable;