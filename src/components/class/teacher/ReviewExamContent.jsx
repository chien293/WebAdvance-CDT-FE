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
import Comment from "@/components/dashboard-page/Comment";
import classService from "@/service/class/classService";
import authService from "@/auth/auth-service";

import { useRouter } from "next/router";

import { useSocket } from "../../SocketProvider";
import { Table, Input, Checkbox, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialData = [
  {
    key: "1",
    input: "",
    checkbox: false,
  },
];
const ReviewExamContent = ({}) => {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState(null);

  const [checkboxData, setCheckboxData] = useState(false);
  const [inputData, setInputData] = useState("");

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
      console.log(newData);

      if (newData.status === "done") setCheckboxData(true);
      const newRows = [
        {
          id: 1,
          currentGrade: newData.score,
          expectedGrade: newData.expectedGrade,
          finalGrade: newData.grade,
        },
      ];
      setInputData(newData.grade);
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
      dataIndex: "currentGrade",
      title: "CURRENT GRADE",
    },
    {
      key: "expectedGrade",
      dataIndex: "expectedGrade",
      title: "EXPECTED GRADE",
    },
    {
      key: "finalGrade",
      dataIndex: "finalGrade",
      title: "FINAL GRADE",
      render: () => <Input value={inputData} onChange={handleInputChange} />,
    },
    {
      key: "markAsFinal",
      dataIndex: "markAsFinal",
      title: "MARK AS FINAL",
      render: () => (
        <Checkbox checked={checkboxData} onChange={handleCheckboxChange} />
      ),
    },
    {
      key: "action",
      dataIndex: "action",
      title: "ACTION",
      render: () => <Button onClick={handleButtonClick}>Save</Button>,
    },
  ];

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setCheckboxData(e.target.checked);
  };

  const handleButtonClick = async () => {
    console.log(inputData);
    console.log(checkboxData);
    const status = checkboxData ? "done" : "pending";
    const url = "/student/review-grade/" + data.idReviewGrade;
    const res = await classService.updateGradeAndStatusOfReviewGrade(
      data.idReviewGrade,
      inputData,
      status,
      userId,
      "teacher",
      url
    );

    const receiverId = await classService.getUserIdByReviewGradeId(
      data.idReviewGrade
    );

    console.log(receiverId);

    socket.emit("sendNotification", {
      senderId: userId,
      receiverId: receiverId,
      type: "user",
    });

    notify("Update grade successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newComment);
    const url = "/student/review-grade/" + data.idReviewGrade;
    const response = await classService.insertComment(
      data.idReviewGrade,
      userId,
      newComment,
      "teacher",
      url
    );

    const receiverId = await classService.getUserIdByReviewGradeId(
      data.idReviewGrade
    );

    socket.emit("sendNotification", {
      senderId: userId,
      receiverId: receiverId,
      type: "user",
    });
    notify("Comment successfully");

    setNewComment("");
    setReload(!reload);
  };

  const notify = (message) => toast(message);

  return (
    <>
      <ToastContainer />
      <Toolbar />
      <div className="flex flex-col items-center justify-center self-center">
        <div className="mt-4 size-full">
          <div className="">
            <span className="text-4xl text-green-600 font-medium">
              Review Grade Teacher
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
            {/* <Table aria-label="Review grade">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    <TableCell>{item.currentGrade}</TableCell>
                    <TableCell>{item.expectedGrade}</TableCell>
                    <TableCell>
                      <Input
                        value={finalGrade}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </TableCell>

                    <TableCell>
                      <Checkbox
                        checked={checkedState["check"]}
                        onChange={handleCheckboxChange}
                        name="check"
                      ></Checkbox>
                    </TableCell>
                    <TableCell>
                      <Button color="default" onClick={handleSave}>
                        Save
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table> */}
            <Table columns={columns} dataSource={rows}></Table>
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
