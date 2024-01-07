import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DemoStudentId from './utils/DemoStudentId';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import AuthService from "@/auth/auth-service";
const AdminManageStudentID = () => {
  const [openCollapse, setOpenCollapse] = useState([]);
  const [uniqueClassIds, setUniqueClassIds] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [token, setToken] = useState(null);
  const API_URL = process.env.SERVER_URL;

  useEffect(() => {

    getStudentIds();

  }, [])

  const getStudentIds = async () => {
    const user = AuthService.getCurrentUser();
    setToken(user.accessToken);
    await axios
      .get(API_URL + "/admin/getStudentIds", {
        headers: {
          token: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        if (res.data) {
          setStudentIds(res.data);

          const uniqueIds = [...new Set(res.data.map((data) => data.classId))];
          uniqueIds.sort();
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

  const handleUpdateStudentId = (data) => {
    const updatedStudentIdsData = studentIds.map(item => {
      const update = data.find(structureItem => structureItem.id === item.id);

      return update || item;
    });
    setStudentIds(updatedStudentIdsData)
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
                  <DemoStudentId rows={classEnrollments} token={token} updateStudentId={handleUpdateStudentId} />
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
