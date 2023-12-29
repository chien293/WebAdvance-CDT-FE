import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PlaceIcon from '@mui/icons-material/Place';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ClassIcon from '@mui/icons-material/Class';
import Link from 'next/link';
import authService from '@/auth/auth-service';
import { useRouter } from "next/navigation";

const Sidebar = ({ onSideBarItemClick }) => {
  const router = useRouter();
  const handleSignOut = () => {
    authService.logout();
    router.push({
      pathname: "/auth/sign-in",
    });
  }
  return (
    <Drawer variant="permanent" anchor="left">
      <div>
        {/* Admin Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px' }}>
          <Avatar src="/path/to/avatar.jpg" alt="Admin Avatar" />
          <p>Admin</p>
        </div>

        {/* Sidebar Navigation */}
        <List>
          <ListItem ButtonBase onClick={() => onSideBarItemClick('teacher')}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemButton >
              Thành viên
            </ListItemButton>
          </ListItem>
          <ListItem ButtonBase onClick={() => onSideBarItemClick('class')}>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemButton>
              Lớp học
            </ListItemButton>
          </ListItem>
          <ListItem ButtonBase onClick={() => onSideBarItemClick('mapId')}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemButton>
              Map Id
            </ListItemButton>
          </ListItem>
        </List>


        <Button
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          style={{ marginTop: 'auto', marginLeft: '16px' }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>

      </div>
    </Drawer>
  );
};

export default Sidebar;
