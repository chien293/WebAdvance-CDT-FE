import React, { useState, useEffect } from "react";
import authService from "@/auth/auth-service";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  useGridApiRef,
} from "@mui/x-data-grid";
import axios from "axios";
import { set } from "date-fns";
import classService from "@/service/class/classService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../SocketProvider";

export default function GradeBoardStudent({ classId }) {
  const socket = useSocket();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentId, setId] = useState(null);
  const [currentToken, setToken] = useState(null);
  const [gradeData, setGradeData] = useState([]);
  const [filterGradeData, setFilterGradeData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [gradeStructure, setGradeStructure] = useState(null);
  const [filterGradeStructure, setFilterGradeStructure] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [sumValues, setSumValues] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  //Grade Review State
  const [selectedReviewGrade, setSelectedReviewGrade] = useState("");
  const [expectationScore, setExpectationScore] = useState(null);
  const [message, setMessage] = useState(null);

  const API_URL = process.env.SERVER_URL;

  useEffect(() => {
    const takeUser = async () => {
      const user = authService.getCurrentUser();
      if (user) {
        setCurrentUser(user.user[0].fullname);
        setId(user.user[0].id);
        setToken(user.accessToken);
      }
      await axios
        .post(
          API_URL + "/getStudentId",
          {
            id: user.user[0].id,
            classId: classId,
          },
          {
            headers: {
              token: "Bearer " + user.accessToken,
            },
          }
        )
        .then((res) => {
          if (res.data[0].studentId) {
            setStudentId(res.data[0].studentId);
          }
        });
    };
    takeUser();
  }, []);

  useEffect(() => {
    if (studentId) {
      getGrade(classId, currentId);
    }
  }, [studentId, classId]);

  //create columns
  useEffect(() => {
    if (gradeData.length > 0) {
      const firstItem = gradeData[0];
      const columns = Object.keys(firstItem)
        .filter((key) => key.toLowerCase() !== "index")
        .map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
        }));
      columns.push({
        field: "edit",
        headerName: "Review mark",
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
      });
      setColumns(columns);
    }
  }, [gradeData]);

  //count sum
  useEffect(() => {
    updateSum();
  }, [filterGradeStructure]);

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
  };

  function calculateAverage(filterGradeStructure, filterGradeData) {
    return filterGradeData.map((student) => {
      let total = 0;
      let percentageSum = 0;
      filterGradeStructure.forEach((item) => {
        const value = student[item.percentage] || 0;
        total += value * item.value;
        percentageSum += item.value;
      });

      return (total / percentageSum).toFixed(2);
    });
  }

  const getGrade = async (idClass) => {
    await axios
      .post(
        API_URL + "/class/student/getGrades",
        {
          idClass: idClass,
          idUser: currentId,
        },
        {
          headers: {
            token: "Bearer " + currentToken,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          if (res.data.length > 0) {
            const structure = res.data.map((obj) => {
              let newObj = { ...obj };
              delete newObj.id;
              delete newObj.fullname;
              return newObj;
            });
            setFilterGradeData(structure);
            setGradeData(res.data);
          } else {
            setGradeData(res.data);
          }
        }
      });

    await axios
      .get(API_URL + "/class/student/getGradeStructures/" + idClass, {
        headers: {
          token: "Bearer " + currentToken,
        },
      })
      .then((res) => {
        if (res.data) {
          const newResult = [];
          if (res.data.length > 0) {
            const structure = res.data.map((obj) => {
              let newObj = { ...obj };
              delete newObj.id;
              return newObj;
            });
            setFilterGradeStructure(structure);

            Object.entries(res.data[0]).forEach(([key, value], index) => {
              if (key !== "id") {
                newResult.push({ id: index + 1, percentage: key, value });
              }
            });
          }
          setGradeStructure(newResult);
        }
      });
  };

  const handleEditClick = (data, field) => {
    setSelectedGrade(data);
    setSelectedColumn(field);
    setEditDialogOpen(true);
    setIsEdit(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setIsEdit(false);
  };

  const handleEditSubmit = async () => {
    // const result = await axios.post(
    //   API_URL + "/class/requestReview",
    //   {
    //     id: currentId,
    //     data: selectedGrade,
    //   },
    //   {
    //     headers: {
    //       token: "Bearer " + currentToken,
    //     },
    //   }
    // );

    const enrollmentId = await classService.getEnrollmentForReview(
      classId,
      currentId
    );
    const selectedGradeId = await classService.getAGrade(
      classId,
      currentId,
      selectedReviewGrade
    );
    const url = "/teacher/review-grade/";
    const result = await classService.insertReviewGrade(
      enrollmentId,
      selectedGradeId,
      expectationScore,
      message,
      currentId,
      url
    );
    const idReviewGrade = result.insertId;
    const receiverId = await classService.getTeacherIdByReviewGradeId(
      idReviewGrade
    );
    socket.emit("sendNotification", {
      senderId: currentId,
      receiverId: receiverId,
      type: "user",
    });
    notify("Review submitted");

    handleEditDialogClose();
  };

  const handleTextFieldChange = (field, value) => {
    setSelectedGrade((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleChange = (event) => {
    setSelectedReviewGrade(event.target.value);
  };
  const notify = (message) => toast(message);

  const editContent = () => {
    if (!filterGradeData || filterGradeData.length === 0) return null;
    const gradeCols = filterGradeData[0];
    delete gradeCols.index;
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Grade</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedReviewGrade}
            label="Grade Review"
            onChange={handleChange}
          >
            {Object.entries(gradeCols).map(([key, value]) => {
              return <MenuItem value={key}>{key}</MenuItem>;
            })}
          </Select>

          <TextField
            style={{ marginTop: 30 }}
            label="Expectation Score"
            fullWidth
            value={expectationScore}
            onChange={(e) => setExpectationScore(e.target.value)}
          />
          <TextField
            style={{ marginTop: 30 }}
            label="Explanation"
            fullWidth
            multiline
            placeholder="Reason why you submit this review"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>
      </div>
    );
  };

  return studentId ? (
    <div
      style={{
        height: 450,
        width: "100%",
      }}
    >
      <ToastContainer />
      <DataGrid
        rows={gradeData}
        columns={columns}
        initialState={{
          ...gradeData.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10]}
        pagination
      />
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit score</DialogTitle>
        <Box mt={-1}>
          <DialogContent>
            <Box mb={2}>
              {
                isEdit ? editContent() : null

                // columns.filter(
                //   (column) =>
                //     column.field !== "edit" &&
                //     column.field !== "id" &&
                //     column.field !== "fullname" &&
                //     column.field !== "sum"
                // )
                // .map((column) => (
                //   <Box mb={2} key={column.field}>
                //     <TextField
                //       label="Expectation Score"
                //       fullWidth
                //       value={
                //         selectedGrade
                //           ? selectedGrade[column.headerName]
                //           : ""
                //       }
                //       onChange={(e) =>
                //         handleTextFieldChange(column.field, e.target.value)
                //       }
                //     />
                //     <TextField
                //       style={{ marginTop: 30 }}
                //       label="Message"
                //       fullWidth
                //       multiline
                //       placeholder="Reason why you submit this review"
                //       onChange={(e) =>
                //         handleTextFieldChange(column.field, e.target.value)
                //       }
                //     />
                //   </Box>
                // ))
              }
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
  ) : (
    <div
      style={{
        height: 450,
        width: "100%",
      }}
    >
      You need to verify your studentId to view grade.
    </div>
  );
}
