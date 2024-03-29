import React, { useState } from "react";
import { Toolbar, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DataGrid } from "@mui/x-data-grid";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import { Paper, Checkbox, Button } from "@mui/material";
import Comment from "@/components/dashboard-page/Comment";
import classService from "@/service/class/classService";
import authService from "@/auth/auth-service";
import { set } from "date-fns";
import { useRouter } from "next/router";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useSocket } from "../SocketProvider";

const ReviewExamContent = ({}) => {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState(null);
  const socket = useSocket();

  const [rows, setRows] = useState([
    {
      id: 1,
      currentGrade: "",
      expectedGrade: "",
      finalGrade: "",
    },
  ]);
  const [isDone, setIsDone] = useState(false);
  React.useEffect(() => {
    const user = authService.getCurrentUser();
    setUserId(user.user[0].id);
    const { id } = router.query;

    const fetchData = async () => {
      const newData = await classService.getReviewGradeById(id);
      setData(newData);
      if (newData.status === "done") setIsDone(true);
      const newRows = [
        {
          id: 1,
          currentGrade: newData.score,
          expectedGrade: newData.expectedGrade,
          finalGrade: newData.grade,
        },
      ];
      setRows(newRows);
      setReload(!reload);
    };
    if (id) fetchData();
  }, [router.isReady]);

  React.useEffect(() => {
    //call load cmt api
    const fetchData = async () => {
      const newData = await classService.getCommentByReviewGradeId(
        data.idReviewGrade
      );

      setComments(newData);
    };
    if (data) fetchData();
  }, [reload]);

  const columns = [
    {
      key: "currentGrade",
      label: "CURRENT GRADE",
    },
    {
      key: "expectedGrade",
      label: "EXPECTED GRADE",
    },
    {
      key: "finalGrade",
      label: "FINAL GRADE",
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowSelection = (rowId) => {
    setSelectedRow(rowId === selectedRow ? null : rowId);
    console.log(rowId);
  };

  const handleButtonClick = () => {
    // Perform your action when the button is clicked
    // Access the data for the selected row using `data[selectedRow]`
    if (selectedRow !== null) {
      console.log("Selected row data:", data[selectedRow]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const url = "/teacher/review-grade/" + data.idReviewGrade;
    const response = await classService.insertComment(
      data.idReviewGrade,
      userId,
      newComment,
      "student",
      url
    );

    const receiverId = await classService.getTeacherIdByReviewGradeId(
      data.idReviewGrade
    );
    socket.emit("sendNotification", {
      senderId: userId,
      receiverId: receiverId,
      type: "user",
    });
    setNewComment("");
    setReload(!reload);
  };

  return (
    <>
      <Toolbar />
      <div className="flex flex-col items-center justify-center self-center">
        <div className="mt-4 size-full">
          <div className="">
            <span className="text-4xl text-green-600 font-medium">
              Review Grade
            </span>
            <div className="flex flex-row">
              <span>{data && data.createdDate}</span>
            </div>
          </div>
          <Divider
            style={{
              backgroundColor: "green",
              height: "2px",
              marginTop: "20px",
              marginBottom: "20px ",
            }}
          />
          <div className="mb-4 flex justify-between">
            <div className="">
              <span>Explanation: </span>
              {data && data.explanation}
            </div>
            <div className="">
              <span>Status: </span>
              {data && data.status}
            </div>
          </div>

          <div className="mb-4">
            <Table aria-label="">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Divider
        style={{
          backgroundColor: "green",
          height: "2px",
          marginTop: "20px",
          marginBottom: "20px ",
        }}
      />
      <div className="grid grid-cols-1 justify-items-start">
        <h2 className="text-2xl font-medium">Comments</h2>
        <form
          className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Add a new comment
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                disabled={isDone}
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Type Your Comment"
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="-mr-1">
                <input
                  type="submit"
                  class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="Post Comment"
                />
              </div>
            </div>
          </div>
        </form>
        {comments &&
          comments.map((cmt) => (
            <Comment
              image={cmt.image}
              key={cmt.id}
              userName={cmt.fullname}
              date={cmt.createdDate}
              content={cmt.content}
            />
          ))}
      </div>
    </>
  );
};

export default ReviewExamContent;
