import React, { useEffect } from 'react';
import styles from './Home.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Dashboard from '@mui/icons-material/Dashboard';
import Task from '@mui/icons-material/Task';
import Person from '@mui/icons-material/Person';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice/userSlice';
import { getUsers } from '../../features/adminSlice/adminSlice';
import { getTasks } from '../../features/taskSlice/taskSlice';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};


export default function Home() {
    // Use state used by MUI component
    const [value, setValue] = React.useState('recents');
    
    // Select current user
    const user = useSelector(selectUser);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle route changes
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Routing based on newValue(Route)/Navigate to different routes based on the newValue
        switch(newValue){
            case 'dashboard': navigate('/dashboard'); return;
            case 'tasks': navigate('/tasks'); return;
            case 'users': navigate('/users'); return;
            case 'profile': navigate('/profile'); return;
        }
    };
    useEffect(() => {
        if(user?.id){
            // Get users and task details if user logged in
            dispatch(getUsers());
            dispatch(getTasks());
        }
    },[user]); 

  return (
    <div className={styles.home}>
            <Box
            className={styles.leftSide}
                sx={{
                    '& > :not(style)': {
                    boxSizing: 'border-box',
                    p: 2,
                    width: 240,
                    height: '100vh',
                    zIndex: 100,
                    },
                }}
                
                >
                <Paper elevation={3} square>
                <List sx={style} component="nav" aria-label="mailbox folders">
                            <ListItem button onClick={()=>{navigate('/dashboard')}} >
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <Divider />
                            <ListItem button divider  onClick={()=>{navigate('/tasks')}}>
                                <ListItemText primary="Tasks" />
                            </ListItem>
                            <ListItem button  onClick={()=>{navigate('/users')}} disabled={user.role === 'Admin'? false:true}>
                                <ListItemText primary="Users" />
                            </ListItem>
                            <Divider light />
                            <ListItem button  onClick={()=>{navigate('/profile')}}>
                                <ListItemText primary="Edit Profile" />
                            </ListItem>
                        </List>
                </Paper>
            </Box>
        <div className={styles.rightSide}>
            <Outlet />
            <BottomNavigation className={styles.bottomNavigation} sx={{ width: '100%' }} value={value} onChange={handleChange}>
                <BottomNavigationAction label="Dashboard" value="dashboard" icon={<Dashboard />}/>
                <BottomNavigationAction label="Tasks" value="tasks" icon={<Task />}/>
                <BottomNavigationAction label="Users" value="users" icon={<Person />} sx={{color: user.role === 'Admin' ? '#666666':'#CCCCCC'}} disabled={user.role === 'Admin'? false:true}/>
                <BottomNavigationAction label="Edit Profile" value="profile" icon={<ManageAccounts />}/>
            </BottomNavigation>
        </div>
    </div>
  )
}
