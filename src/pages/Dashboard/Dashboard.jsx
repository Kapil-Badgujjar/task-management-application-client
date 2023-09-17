import React, { useEffect } from 'react';
import styles from './Dashboard.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getStats, selectStats } from '../../features/dashboardSlice/dashboardSlice';
import { Chart } from "react-google-charts";

export default function Dashboard() {
    const dispatch = useDispatch();
    const data = useSelector(selectStats);
    useEffect(()=>{
        // Get statistics for tasks
        dispatch(getStats());
    },[]);
  return (
    <div className={styles.dashboard}>
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
                    <DashboardIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1, m: 2 }} className={styles.chartHeading}>Task Statistics</Typography> 
            <Chart
            chartType="PieChart"
            data={data}
            options={{
                title: "",
                is3D: true
              }}
            width={"100%"}
            height={"600px"}
        />
        <br/>
        <hr/>
    </div>
  )
}
