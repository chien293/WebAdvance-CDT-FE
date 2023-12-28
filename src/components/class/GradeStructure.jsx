import React, { useEffect, useState, useRef, useCallback } from "react";
import { Table, Button, Modal, Input } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { FaBan, FaCheck } from "react-icons/fa";
import authService from "@/auth/auth-service";
import { useSocket } from "../SocketProvider";
import axios from 'axios';
const type = "DragableBodyRow";

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = useRef();
    const [{ isOver, dropClassName }, drop] = useDrop(
        () => ({
            accept: type,
            collect: (monitor) => {
                const { index: dragIndex } = monitor.getItem() || {};
                if (dragIndex === index) {
                    return {};
                }
                return {
                    isOver: monitor.isOver(),
                    dropClassName: dragIndex < index ? "drop-over-downward" : "drop-over-upward",
                };
            },
            drop: (item) => {
                moveRow(item.index, index);
            },
        }),
        [index]
    );
    const [, drag] = useDrag(
        () => ({
            type,
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [index]
    );
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ""}`}
            style={{ cursor: "move", ...style }}
            {...restProps}
        ></tr>
    );
};

const GradeStructureBoard = ({ classId, onSendNotification }) => {
    const API_URL = process.env.SERVER_URL;
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentId, setId] = useState(null);
    const [currentToken, setToken] = useState(null);
    const socket = useSocket();
    const [columns, setColumns] = useState([
        { title: "Id", dataIndex: "id", key: "id" },
        { title: "Title", dataIndex: "percentage", key: "percentage" },
        { title: "Value", dataIndex: "value", key: "value" },
        {
            title: "Final Score",
            key: "finalScore",
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleFinal(record)}>
                        {record.finalScore == "1" ? <FaCheck /> : <FaBan />}
                    </Button>

                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <div>
                    <Button style={{ marginRight: 10 }} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(record)} danger>
                        Delete
                    </Button>
                </div>
            ),
        },
    ]);

    const [editRowData, setEditRowData] = useState({ percentage: "", value: "" });
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFinalVisible, setIsFinalVisible] = useState(false);
    const [newRowData, setNewRowData] = useState({ percentage: "", value: "" });
    const [deleteRowData, setDeleteRowData] = useState({ percentage: "", value: "" });
    const [finalRowData, setFinalRowData] = useState({ finalScore: "", percentage: "", value: "" });
    const [gradeStructure, setGradeStructure] = useState([]);
    const [listStudentIds, setListStudentIds] = useState([]);

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
        if (currentToken) getData(classId);
    }, [currentToken]);

    const getData = async (classId) => {
        await axios
            .get(API_URL + "/class/getGradeStructures/" + classId, {
                headers: {
                    token: "Bearer " + currentToken,
                },
            })
            .then((res) => {
                if (res.data) {
                    console.log(JSON.stringify(res.data))
                    setGradeStructure(res.data);
                }
            });

        await axios
            .get(API_URL + "/class/getListStudentIds/" + classId, {
                headers: {
                    token: "Bearer " + currentToken,
                },
            })
            .then((res) => {
                if (res.data) {
                    console.log(JSON.stringify(res.data))
                    setListStudentIds(res.data);
                }
            });
    };

    const components = {
        body: {
            row: DragableBodyRow,
        },
    };

    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const dragRow = gradeStructure[dragIndex];
            const newGradeStructure = [...gradeStructure];
            newGradeStructure.splice(dragIndex, 1);
            newGradeStructure.splice(hoverIndex, 0, dragRow);

            const updatedGradeStructure = newGradeStructure.map((item, index) => ({
                ...item,
                id: index + 1,
            }));

            setGradeStructure(updatedGradeStructure);
        },
        [gradeStructure]
    );

    const moveRowRef = useRef(moveRow);
    moveRowRef.current = moveRow;

    const saveDataToDatabase = async () => {
        try {
            await axios.post(
                API_URL + "/class/updateRowGradeStructures",
                { idClass: classId, gradeStructure },
                {
                    headers: {
                        token: "Bearer " + currentToken,
                    },
                }
            );
        } catch (error) {
            console.error("Error saving data to the database", error);
        }
    };

    const handleFinal = (record) => {
        console.log(record)
        setFinalRowData(record);
        setIsFinalVisible(true);
    };

    const handleFinalCancel = () => {
        setFinalRowData({ finalScore: "", percentage: "", value: "" });
        setIsFinalVisible(false);
    };

    const handleFinalOk = async () => {
        setFinalRowData(prev => prev.finalScore === 0 ? prev.finalScore = 1 : prev.finalScore = 0);
        try {
            await axios.post(
                API_URL + "/class/finalGradeStructure",
                {
                    idClass: classId,
                    gradeStructure: finalRowData,
                    url: `/student/class/grade/${classId}`
                },
                {
                    headers: {
                        token: "Bearer " + currentToken,
                    },
                }
            );
        } catch (error) {
            console.error("Error saving data to the database", error);
        }

        const updated= {
            receiverId: listStudentIds,
            type: "class",
        };
        console.log(socket, "CHUan bi chay socket")
        socket.emit("sendClassNotification", {
            data: updated
        });

        const updatedData = gradeStructure.map((item) =>
            item.id === finalRowData.id ? { ...item, percentage: finalRowData.percentage, value: finalRowData.value } : item
        );

        setGradeStructure(updatedData);
        setIsFinalVisible(false);
    };

    const handleEdit = (record) => {
        setEditRowData(record);
        setIsEditModalVisible(true);
    };

    const handleEditOk = async () => {
        try {
            await axios.post(
                API_URL + "/class/updateGradeStructure",
                { idClass: classId, gradeStructure: editRowData },
                {
                    headers: {
                        token: "Bearer " + currentToken,
                    },
                }
            );
        } catch (error) {
            console.error("Error saving data to the database", error);
        }

        const updatedData = gradeStructure.map((item) =>
            item.id === editRowData.id ? { ...item, percentage: editRowData.percentage, value: editRowData.value } : item
        );

        setGradeStructure(updatedData);
        setEditRowData({ percentage: "", value: "", key: null });
        setIsEditModalVisible(false);
    };

    // Hàm xử lý khi click vào nút "Cancel" trong modal chỉnh sửa
    const handleEditCancel = () => {
        setEditRowData({ percentage: "", value: "", key: null });
        setIsEditModalVisible(false);
    };


    const showModal = () => {
        setIsModalVisible(true);
    };

    //Them dong
    const handleOk = () => {
        const newData = { id: gradeStructure.length + 1, percentage: newRowData.percentage, value: newRowData.value };
        setGradeStructure([...gradeStructure, newData]);

        axios.post(API_URL + "/class/addGradeStructure", {
            idClass: classId,
            percentage: newRowData.percentage,
            value: newRowData.value,
            orderValue: gradeStructure.length + 1
        },
            {
                headers: {
                    token: "Bearer " + currentToken,
                },
            }
        )

        setNewRowData({ percentage: "", value: "" });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setNewRowData({ percentage: "", value: "" });
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewRowData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDelete = (record) => {
        setDeleteRowData(record);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteOk = () => {
        const deleteIndex = gradeStructure.findIndex((item) => item.id === deleteRowData.id);

        // Loại bỏ dòng khỏi mảng
        const updatedData = [...gradeStructure];
        updatedData.splice(deleteIndex, 1);

        // Cập nhật lại giá trị id
        const updatedWithNewIds = updatedData.map((item, index) => ({
            ...item,
            id: index + 1,
        }));


        axios.post(API_URL + "/class/deleteGradeStructure", {
            idClass: classId,
            id: deleteRowData.id,
            gradeStructure: updatedWithNewIds,
            deletedValue: deleteRowData.percentage
        },
            {
                headers: {
                    token: "Bearer " + currentToken,
                },
            }
        )
        setGradeStructure(updatedWithNewIds);
        setDeleteRowData({ percentage: "", value: "" });
        setIsDeleteModalVisible(false);
    };

    const handleDeleteCancel = () => {
        setDeleteRowData({ percentage: "", value: "" });
        setIsDeleteModalVisible(false);
    }

    return (
        <div>
            <h2>Grade Structure Board</h2>
            <Button style={{ color: "blue" }} type="primary" onClick={showModal}>
                Thêm Dòng
            </Button>

            <Button style={{ color: "blue" }} type="primary" onClick={saveDataToDatabase}>
                Save Structure
            </Button>
            <Modal title="Public score" open={isFinalVisible} onOk={handleFinalOk} onCancel={handleFinalCancel}>
                <label>Do you want to public {finalRowData.percentage} ? </label>
            </Modal>

            <Modal title="Thêm Dòng" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <label>Tên:</label>
                <Input name="percentage" value={newRowData.percentage} onChange={handleInputChange} />
                <label>Value:</label>
                <Input name="value" value={newRowData.value} onChange={handleInputChange} />
            </Modal>

            <Modal title="Chỉnh Sửa Dòng" open={isEditModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                <label>Tên:</label>
                <Input
                    name="percentage"
                    value={editRowData.percentage}
                    onChange={(e) => setEditRowData((prevData) => ({ ...prevData, percentage: e.target.value }))}
                />
                <label>Value:</label>
                <Input
                    name="value"
                    value={editRowData.value}
                    onChange={(e) => setEditRowData((prevData) => ({ ...prevData, value: e.target.value }))}
                />
            </Modal>

            <Modal title="Xoa" open={isDeleteModalVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
                <label>Do you want to delete {deleteRowData.percentage} ? </label>
            </Modal>

            <DndProvider backend={HTML5Backend}>
                <Table
                    columns={columns}
                    dataSource={gradeStructure}
                    components={{
                        body: {
                            row: (props) => <DragableBodyRow {...props} moveRow={moveRowRef.current} />,
                        },
                    }}
                    onRow={(record, index) => ({
                        index,
                        moveRow: moveRowRef.current,
                    })}
                />
            </DndProvider>
        </div>
    );
};

export default GradeStructureBoard;
