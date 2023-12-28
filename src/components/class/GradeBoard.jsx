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
  GridToolbarContainer, GridToolbarExport, useGridApiRef
} from '@mui/x-data-grid';
import axios from 'axios';
import * as XLSX from 'xlsx'

export default function GradeBoard(props) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentId, setId] = useState(null);
  const [currentToken, setToken] = useState(null);
  const [gradeData, setGradeData] = useState([]);
  const [filterGradeData, setFilterGradeData] = useState([]);
  const [columns, setColumns] = useState([]);
  const apiRef = useGridApiRef()
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [gradeStructure, setGradeStructure] = useState(null);
  const [filterGradeStructure, setFilterGradeStructure] = useState(null);
  const [sumValues, setSumValues] = useState([]);

  const API_URL = process.env.SERVER_URL;

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
      getGrade(props.classId);

    }
  }, [currentToken]);

  //create columns
  useEffect(() => {
    if (gradeData.length > 0) {
      const firstItem = gradeData[0];
      const columns = Object.keys(firstItem).filter((key) => key.toLowerCase() !== "index").map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        width: 150,
      }));
      columns.push(
        {
          field: 'edit',
          headerName: 'Chỉnh sửa',
          width: 120,
          renderCell: (params) => (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleEditClick(params.row, params.field)}
            >
              <EditIcon />
            </Button>
          ),
        },
      )
      setColumns(columns)
    }
  }, [gradeData]);

  //count sum
  useEffect(() => {
    updateSum()
  }, [filterGradeData]);

  const updateSum = () => {
    if (gradeStructure != null && gradeStructure.length > 0) {
      const sumValues = calculateAverage(filterGradeStructure, filterGradeData);
      if (gradeData.length > 0 && sumValues.length > 0) {
        const newGradeData = gradeData.map((item, index) => {
          return {
            ...item,
            sum: sumValues[index],
          };
        });
        setGradeData(newGradeData);
      }

    }
  }

  function calculateAverage(filterGradeStructure, filterGradeData) {
    return filterGradeData.map(student => {
      let total = 0;
      let percentageSum = 0;
      filterGradeStructure.forEach(item => {
        const value = student[item.percentage] || 0;
        total += value * item.value;
        percentageSum += item.value;
      });

      return (total / percentageSum).toFixed(2);
    });
  }

  const getGrade = async (classId) => {
    await axios
      .get(API_URL + "/class/getGradeStructures/" + classId, {
        headers: {
          token: "Bearer " + currentToken,
        },
      })
      .then((res) => {
        if (res.data) {
          const newResult = []
          if (res.data.length > 0) {
            const structure = res.data.map(obj => {
              let newObj = { ...obj };
              delete newObj.id;
              delete newObj.finalScore;
              return newObj;
            });
            setFilterGradeStructure(structure);


            Object.entries(res.data[0]).forEach(([key, value], index) => {
              if (key !== 'id') {
                newResult.push({ id: index + 1, percentage: key, value });
              }
            });
          }
          setGradeStructure(newResult);
        }
      });

    await axios.get(
      API_URL + "/class/getGrades/" + classId,
      {
        headers: {
          token: "Bearer " + currentToken,
        },
      }
    ).then((res) => {
      if (res.data) {
        const structure = res.data.map(obj => {
          let newObj = { ...obj };
          delete newObj.id;
          delete newObj.fullname;
          delete newObj.index;
          return newObj;
        });
        setFilterGradeData(structure)
        setGradeData(res.data);
      }
    })
  }


  const handleEditClick = (data, field) => {
    setSelectedGrade(data);
    setSelectedColumn(field);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSubmit = async () => {
    const result = await axios.post(
      API_URL + "/class/updateGrade",
      {
        data: selectedGrade
      },
      {
        headers: {
          token: "Bearer " + currentToken,
        },
      }
    );

    setGradeData((prevIds) =>
      prevIds.map((data) =>
        data.id === selectedGrade.id ? { ...data, ...selectedGrade } : data
      )
    );


    handleEditDialogClose();
  };

  const handleTextFieldChange = (field, value) => {
    setSelectedGrade((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const CustomToolbar = () => {
    const handleExportClick = () => {
      const ws = XLSX.utils.json_to_sheet(gradeData);
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

        setGradeData(importedData);

        const structure = importedData.map(obj => {
          let newObj = { ...obj };
          delete newObj.id;
          delete newObj.fullname;
          delete newObj.index;
          return newObj;
        });
        setFilterGradeData(structure)
        // Handle the imported data
        const result = await axios.post(
          API_URL + "/class/updateGrades",
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
      style={{
        height: 450,
        width: "100%",
      }}
    >
      <DataGrid
        rows={gradeData}
        columns={columns}
        initialState={{
          ...gradeData.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}


        slots={{
          toolbar: () => <CustomToolbar />,
        }}
        pageSizeOptions={[5, 10]}
        pagination
      />
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit score</DialogTitle>

        <Box mt={-1}>
          <DialogContent>
            <Box mb={2}>
              {selectedColumn ? columns
                .filter(column => column.field !== 'edit' && column.field !== 'id' && column.field !== 'fullname' && column.field !== 'sum')
                .map((column) => (
                  <Box mb={2} key={column.field}>
                    <TextField
                      label={column.headerName}
                      fullWidth
                      value={selectedGrade ? selectedGrade[column.field] : ''}
                      onChange={(e) => handleTextFieldChange(column.field, e.target.value)}
                    />
                  </Box>
                ))
                : null}
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

