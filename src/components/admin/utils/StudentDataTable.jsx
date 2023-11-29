// components/TeacherDataTable.js
import React, { useState } from 'react';
import { GridToolbarContainer, GridToolbarExport, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

const StudentDataTable = ({ students }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fullname', headerName: 'Họ tên', width: 150 },  
    { field: 'active', headerName: 'Xác thực', width: 150 },
    { field: 'verified', headerName: 'Active', width: 100 },
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

  return (
    <div className="dataTable">
      {students && students.length > 0 ? (
        <DataGrid
          rows={students}
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
        <p>No students available.</p>
      )}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Chỉnh sửa thông tin giáo viên</DialogTitle>
        <DialogContent>
          {/* Edit form fields */}
          <TextField
            label="Họ tên"
            fullWidth
            value={selectedTeacher ? selectedTeacher.fullName : ''}
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

export default StudentDataTable;
