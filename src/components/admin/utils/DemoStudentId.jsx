import React, { useEffect, useState, memo } from 'react';
import {
    Dialog,
    DialogTitle, DialogContent, DialogActions, DialogContentText,
    Button, TextField, CircularProgress, Box, Toolbar
} from '@mui/material';
import {
    DataGridPro, GridColDef, GridToolbar,
    GridToolbarContainer, GridToolbarExport, useGridApiRef, gridRowsLookupSelector, gridPaginatedVisibleSortedGridRowIdsSelector
} from '@mui/x-data-grid-pro';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from 'xlsx'
import AuthService from "@/auth/auth-service";
const DemoStudentId = ({ rows, token, updateStudentId }) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState([]);
    const [loadingActive, setLoading] = useState(false);
    const [studentIdsData, setStudentIdsData] = useState([]);
    const [editedUserId, setEditedUserId] = useState([]);
    const [currentId, setId] = useState(null);
    const apiRef = useGridApiRef()
    const API_URL = process.env.SERVER_URL;
    useEffect(() => {
        if (rows) {
            setStudentIdsData(rows);
        }
    }, [rows])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullname', headerName: 'Full Name', width: 200 },
        { field: 'classId', headerName: 'Class Id', width: 200 },
        { field: 'studentId', headerName: 'Student Id', width: 200 },
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
        const selectedStudentIdArray = [data];

        setSelectedStudentId(selectedStudentIdArray);
        setEditedUserId(data.studentId || '');
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleEditSubmit = async () => {
        const result = await axios.post(
            API_URL + "/admin/mapStudentId",
            {
                id: selectedStudentId[0].id,
                studentId: editedUserId,
            },
            {
                headers: {
                    token: "Bearer " + token,
                },
            }
        );
        const updatedData = selectedStudentId.map((data) => ({
            ...data,
            studentId: parseInt(editedUserId),
        }));
        console.log(updatedData)
        updateStudentId(updatedData);

        handleEditDialogClose();
    };

    function CustomToolbar() {
        const handleExportClick = () => {
            const ws = XLSX.utils.json_to_sheet(studentIdsData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
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
                const structure = importedData.map(obj => {
                    let newObj = { ...obj };
                    delete newObj.__rowNum__;
                    return newObj;
                });

                updateStudentId(structure);
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
        <div>
            {studentIdsData && studentIdsData.length > 0 ? (
                <div style={{ width: '100%', }}>
                    <DataGrid
                        rows={studentIdsData}
                        columns={columns}
                        initialState={{
                            ...studentIdsData.initialState,
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        slots={{
                            toolbar: CustomToolbar,
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
                                label="Student Id"
                                fullWidth
                                value={editedUserId}
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

export default DemoStudentId;