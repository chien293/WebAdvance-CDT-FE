import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import AdminStudentIdTable from './utils/AdminStudentIdTable';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

const AdminManageStudentID = ({ token }) => {
  const [openCollapse, setOpenCollapse] = useState([]);
  const [uniqueClassIds, setUniqueClassIds] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const API_URL = process.env.SERVER_URL;

  useEffect(() => {
    if (token) {
      getStudentIds();
    }
  }, [token])

  const getStudentIds = async () => {
    await axios
      .get(API_URL + "/admin/getStudentIds", {
        headers: {
          token: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data) {
          setStudentIds(res.data);

          const uniqueIds = [...new Set(res.data.map((data) => data.classId))];
          setUniqueClassIds(uniqueIds);
          // Initialize openCollapse state with false for each classId
          setOpenCollapse(uniqueIds.map(() => false));
        }
      });
  };


  const handleCollapseToggle = (classIndex) => {
    setOpenCollapse((prev) =>
      prev.map((value, index) => (index === classIndex ? !value : false))
    );
  };

  return (
    <div>
      <List>
        {uniqueClassIds.map((classId, index) => {
          const classEnrollments = studentIds.filter((data) => data.classId === classId);
          return (
            <div key={classId}>
              <ListItemButton onClick={() => handleCollapseToggle(index)}>
                <ListItemText primary={`Class ${classId}`} />
                {openCollapse[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCollapse[index]}>
                <div key={index}>
                  <AdminStudentIdTable rows={classEnrollments} token={token} index={index}/>
                </div>
              </Collapse>
            </div>
          );
        })}
      </List>
    </div>
  );
};



export default AdminManageStudentID
