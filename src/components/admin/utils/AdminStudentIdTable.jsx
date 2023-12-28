import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle, DialogContent, DialogActions, DialogContentText,
    Button, TextField, CircularProgress, Box, Toolbar
} from '@mui/material';
import {
    DataGridPro, GridColDef, GridToolbar,
    GridToolbarContainer, GridToolbarExport, useGridApiRef
} from '@mui/x-data-grid-pro';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from 'xlsx'

const AdminStudentIdTable = ({ studentIds, token }) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [loadingActive, setLoading] = useState(false);
    const [studentIdsData, setStudentIdsData] = useState(null);
    const [editedUserId, setEditedUserId] = useState('');
    const [currentId, setId] = useState(null);
    const apiRef = useGridApiRef()
    const API_URL = process.env.SERVER_URL;

    React.useEffect(() => {
        if (studentIds) {
            setStudentIdsData(studentIds);
        }
    }, [studentIds])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'idstudent', headerName: 'Email', width: 200 },
        {
            field: 'iduser',
            headerName: 'User Id',
            width: 150,
        },
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

    const handleEditClick = (data) => {
        setSelectedStudentId(data);
        setEditedUserId(data.userId || '');
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleEditSubmit = async () => {
        const result = await axios.post(
            API_URL + "/admin/mapStudentId",
            {
                id: selectedStudentId.id,
                userId: editedUserId,
            },
            {
                headers: {
                    token: "Bearer " + token,
                },
            }
        );

        setStudentIdsData((prevIds) =>
            prevIds.map((data) =>
                data.id == selectedStudentId.id ?
                    { ...data, iduser: editedUserId, } : data
            )
        );

        handleEditDialogClose();
    };

    const CustomToolbar = () => {
        const handleExportClick = () => {
            const ws = XLSX.utils.json_to_sheet(studentIdsData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
            XLSX.writeFile(wb, 'exported_data.xlsx');
        };

        const handleImportClick = (e) => {
            const file = e.target.files[0];

            if (!file) {
                console.error('No file selected');
                return;
            }

            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const importedData = XLSX.utils.sheet_to_json(sheet, {
                    defval: null // Default value
                  });

                const result = await axios.post(
                    API_URL + "/admin/mapListStudentIds",
                    {
                        data: importedData
                    },
                    {
                        headers: {
                            token: "Bearer " + token,
                        },
                    }
                );
                setStudentIdsData(importedData);
            };

            reader.readAsArrayBuffer(file);
        };

        return (
            <GridToolbarContainer>
                <Button color="primary" variant="outlined" onClick={handleExportClick}>
                    Export
                </Button>
                <input
                    accept=".xlsx"
                    style={{ display: 'none' }}
                    id="import-file"
                    type="file"
                    onChange={handleImportClick}
                />
                <label htmlFor="import-file">
                    <Button color="primary" variant="outlined" component="span">
                        Import
                    </Button>
                </label>
            </GridToolbarContainer>
        );
    };

    return (
        <div className="studentIdsDataTable">
            {studentIdsData && studentIdsData.length > 0 ? (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={studentIdsData}
                        columns={columns}
                        initialState={{
                            ...studentIdsData.initialState,
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        slots={{
                            toolbar: () => <CustomToolbar />,
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        pagination
                    />
                </div>
            ) : (
                <p>No ids available.</p>
            )}

            {/* edit */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Map student id</DialogTitle>

                <Box mt={-1}>
                    <DialogContent>
                        <Box mb={2}>
                            <TextField
                                label="UserId"
                                fullWidth
                                value={selectedStudentId?.iduser}
                                onChange={(e) => setEditedUserId(e.target.value)}
                            />
                        </Box>
                    </DialogContent>
                </Box>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminStudentIdTable;