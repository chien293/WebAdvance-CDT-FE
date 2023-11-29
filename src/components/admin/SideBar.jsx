import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ClassIcon from '@mui/icons-material/Class';

const Sidebar = ({onSideBarItemClick }) => {
  return (
    <Drawer variant="permanent" anchor="left">
      <div>
        {/* Admin Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
          <Avatar src="/path/to/avatar.jpg" alt="Admin Avatar" />
          <p>Admin Name</p>
        </div>

        {/* Sidebar Navigation */}
        <List>
          <ListItem ButtonBase onClick={() => onSideBarItemClick('teacher')}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Giáo viên" />
          </ListItem>
          <ListItem ButtonBase onClick={() => onSideBarItemClick('student')}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Học sinh" /> 
          </ListItem>
          <ListItem ButtonBase onClick={() => onSideBarItemClick('class')}>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Lớp học" />
          </ListItem>
        </List>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          style={{ marginTop: 'auto', marginLeft: '16px' }}
        >
          Sign Out
        </Button>
      </div>
    </Drawer>
  );
};

export default Sidebar;
