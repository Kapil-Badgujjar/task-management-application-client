import React, {useEffect} from 'react';
import styles from './Users.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Person from '@mui/icons-material/Person';
import UsersTable from '../../components/UsersTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../features/userSlice/userSlice';
import { getUsers } from '../../features/adminSlice/adminSlice';

export default function Users() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if(user?.id){
            // Get users details if user logged in
            dispatch(getUsers());
        }
    },[user]); 
  return (
    <div className={styles.users}>
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
                    <Person />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    All Users
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
        <UsersTable />
    </div>
  )
}
