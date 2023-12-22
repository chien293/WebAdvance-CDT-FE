import React, { useState, useEffect } from "react";
import authService from "@/auth/auth-service";
import {
  Dialog,
  DialogTitle, DialogContent, DialogActions, Box, TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  DataGridPro, GridColDef, GridToolbar,
  GridToolbarContainer, GridToolbarExport, useGridApiRef
} from '@mui/x-data-grid-pro';
import axios from 'axios';
import * as XLSX from 'xlsx'

export default function GradeBoard(props) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentId, setId] = useState(null);
  const [currentToken, setToken] = useState(null);
  const [gradeData, setGradeData] = useState([]);
  const [columns, setColumns] = useState([]);
  const apiRef = useGridApiRef()
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [gradeStructure, setGradeStructure] = useState(null);
  const [sumValues, setSumValues] = useState({});

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

  useEffect(() => {
    if (gradeData.length > 0) {
      const firstItem = gradeData[0];
      const columns = Object.keys(firstItem).map((key) => ({
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
      getGradeStructures(props.classId);
    }
  }, [gradeData]);

  const getGrade = async (classId) => {
    await axios.get(
      API_URL + "/class/getGrades/" + classId,
      {
        headers: {
          token: "Bearer " + currentToken,
        },
      }
    ).then((res) => {
      if (res.data) {
        console.log(JSON.stringify(res.data))
        setGradeData(res.data);
      }
    })

  }

  const getGradeStructures = async (classId) => {
    await axios
      .get(API_URL + "/class/getGradeStructures/" + classId, {
        headers: {
          token: "Bearer " + currentToken,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          calculateSum(res.data);

          setGradeStructure(res.data);
        }
      });
  };

  const calculateSum = (data) => {
    const structure = data;
    const sums = {};
    console.log(JSON.stringify(gradeData) + " SUM")
    gradeData.forEach((item) => {
      // Duyệt qua mỗi cột trong gradeStructure
      structure.forEach((structureItem) => {
        // Kiểm tra nếu cột tồn tại trong gradeData và không phải là 'full name' hoặc 'id'
        if (
          item.hasOwnProperty(structureItem.id) &&
          structureItem.id !== 'full name' &&
          structureItem.id !== 'id'
        ) {
          // Nếu chưa có giá trị tổng cho học sinh, khởi tạo là 0
          if (!sums[item.id]) {
            sums[item.id] = 0;
          }

          // Thêm giá trị cột vào tổng
          sums[item.id] += parseFloat(item[structureItem.id] || 0);
        }
      });
    });
    setSumValues(sums);
  };

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

    getGradeStructures(props.id);

    setStudentIdsData((prevIds) =>
      prevIds.map((data) =>
        data.id == selectedStudentId.id ?
          { ...data, iduser: editedUserId, } : data
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


  const CustomToolbar = ({ apiRef }) => {
    const handleExportClick = () => {
      if (!apiRef?.current) {
        console.error('apiRef is not available');
        return;
      }

      const dataToExport = apiRef.current.getRowModels()
      const valuesArray = Array.from(dataToExport.values());

      valuesArray.map(row => ({
        id: row.id,
        idstudent: row.idstudent,
        iduser: row.iduser,
      }));


      const ws = XLSX.utils.json_to_sheet(valuesArray);
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
        const importedData = XLSX.utils.sheet_to_json(sheet);

        // Handle the imported data
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
    <div
      style={{
        height: 450,
        width: "100%",
      }}
    >
      <DataGridPro
        rows={gradeData}
        columns={columns}
        initialState={{
          ...gradeData.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}

        apiRef={apiRef}
        slots={{
          toolbar: () => <CustomToolbar apiRef={apiRef} />,
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
                .filter(column => column.field !== 'edit' && column.field !== 'id' && column.field !== 'fullname')
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

