import React, { useEffect } from 'react';
import styles from './Tasks.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TaskIcon from '@mui/icons-material/Task';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, selectTasks } from '../../features/taskSlice/taskSlice';
import Table from '../../components/Table';

export default function Tasks() {
    const dispatch = useDispatch();
    // const tasks = useSelector(selectTasks);
    useEffect(()=>{
        dispatch(getTasks());
    },[]);
  return (
    <div className={styles.tasks}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <TaskIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Tasks
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
        <Table />
    </div>
  )
}
