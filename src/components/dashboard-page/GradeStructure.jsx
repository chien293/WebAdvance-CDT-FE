import React, { useEffect, useState, useRef, useCallback } from "react";
import { Table, Button, Modal, Input } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import authService from "@/auth/auth-service";
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

const GradeStructureBoard = (props) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentId, setId] = useState(null);
    const [currentToken, setToken] = useState(null);
    const [columns, setColumns] = useState([
        { title: "Percentage", dataIndex: "percentage", key: "percentage" },
        { title: "Value", dataIndex: "value", key: "value" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Button onClick={() => handleDelete(record.key)} danger>
                    Delete
                </Button>
            ),
        },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newRowData, setNewRowData] = useState({ percentage: "", value: "" });
    const [gradeStructure, setGradeStructure] = useState([]);

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
        if (currentToken) getData(props.classId);
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
                    setGradeStructure(res.data);
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
            setGradeStructure(newGradeStructure);
        },
        [gradeStructure]
    );

    const moveRowRef = useRef(moveRow);
    moveRowRef.current = moveRow;

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const newData = { percentage: newRowData.percentage, value: newRowData.value, key: gradeStructure.length };
        setGradeStructure([...gradeStructure, newData]);

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

    const handleDelete = (key) => {
        const updatedData = gradeStructure.filter((item) => item.key !== key);
        setGradeStructure(updatedData);
    };

    const API_URL = process.env.SERVER_URL;

    return (
        <div>
            <h2>Grade Structure Board</h2>
            <Button style={{ color: "blue" }} type="primary" onClick={showModal}>
                Thêm Dòng
            </Button>

            <Modal title="Thêm Dòng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <label>Tên:</label>
                <Input name="percentage" value={newRowData.percentage} onChange={handleInputChange} />
                <label>Value:</label>
                <Input name="value" value={newRowData.value} onChange={handleInputChange} />
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
