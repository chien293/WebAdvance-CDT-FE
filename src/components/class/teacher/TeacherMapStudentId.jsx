import React, { useState, useEffect } from "react";
import authService from "@/auth/auth-service";
import {
    Dialog,
    DialogTitle, DialogContent, DialogActions, Box, TextField,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
    DataGrid, GridColDef, GridToolbar,
    GridToolbarContainer, GridToolbarExport,
} from '@mui/x-data-grid';
import axios from 'axios';
import * as XLSX from 'xlsx'

export default function TeacherMapStudentId({ classId }) {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentId, setId] = useState(null);
    const [currentToken, setToken] = useState(null);
    const [listIds, setListIds] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState([]);


    const API_URL = process.env.SERVER_URL;

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullname', headerName: 'Fullname', width: 200 },
        { field: 'studentId', headerName: 'Student ID', width: 150 },
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

    useEffect(() => {
        const takeUser = () => {
            const user = authService.getCurrentUser();
            if (user) {
                setCurrentUser(user.user[0].fullname);
                setId(user.user[0].id);
                setToken(user.accessToken);
            }
        };
        takeUser();

    }, []);

    useEffect(() => {
        if (currentToken) {
            getGrade(classId);
        }
    }, [currentToken, classId]);


    const getGrade = async (classId) => {
        await axios.get(
            API_URL + "/class/getStudentIds/" + classId,
            {
                headers: {
                    token: "Bearer " + currentToken,
                },
            }
        ).then((res) => {
            if (res.data) {
                setListIds(res.data);
            }
        })
    }

    const handleEditClick = (data) => {
        console.log(data);

        setSelectedGrade(data);
        setSelectedColumn(data);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleEditSubmit = async () => {
        const result = await axios.post(
            API_URL + "/class/updateStudentId",
            {
                data: selectedColumn,
                studentId: selectedGrade
            },
            {
                headers: {
                    token: "Bearer " + currentToken,
                },
            }
        );

        setListIds((prevIds) =>
            prevIds.map((data) =>
                data.id === selectedColumn.id ? { ...data, studentId: selectedGrade } : data
            )
        );

        handleEditDialogClose();
    };

    const CustomToolbar = () => {
        const handleExportClick = () => {
            const ws = XLSX.utils.json_to_sheet(listIds);
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

                setListIds(importedData);

                // Handle the imported data
                const result = await axios.post(
                    API_URL + "/class/updateStudentIds",
                    {
                        data: importedData
                    },
                    {
                        headers: {
                            token: "Bearer " + currentToken,
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
        <div

        >
            <DataGrid
                rows={listIds}
                columns={columns}
                initialState={{
                    ...listIds.initialState,
                    pagination: { paginationModel: { pageSize: 10 } },
                }}


                slots={{
                    toolbar: () => <CustomToolbar />,
                }}
                pageSizeOptions={[5, 10]}
                pagination
            />
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Map Id </DialogTitle>

                <Box mt={-1}>
                    <DialogContent>
                        <Box mb={2}>
                            <Box mb={2}>
                                <TextField
                                    label={selectedGrade?.fullname}
                                    fullWidth
                                    value={selectedGrade?.studentId}
                                    onChange={(e) => setSelectedGrade(e.target.value)}
                                />
                            </Box>
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
}

