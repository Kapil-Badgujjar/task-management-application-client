import React from 'react';
import styles from './Profile.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../features/userSlice/userSlice';
import { Link } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
  return (
    <div className={styles.profile}>
            <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <ManageAccounts />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Edit Profile
                </Typography>
                <Button variant="text" sx={{color: '#fff', outline: '1px solid #fff'}} onClick={()=>{dispatch(logout()); navigate('/login')}}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2}} >
            <Typography variant="h3" gutterBottom>
            {user.username}
            </Typography>
            <Typography variant="h6" sx={{ color: '#a1a1a1'}} gutterBottom>
                {user.email_id}
            </Typography>
            <hr/>
            <TextField label="Username" variant='outlined' value={user.username}/>
            <TextField label="Email" variant='outlined' value={user.email_id}/>
            <TextField label="Role" variant='outlined' value={user.role} disabled/>
            <Button variant='outlined'>Update</Button>
            <div>
            <Outlet />
            <Link component="button" underline="always" onClick={()=>{ window.location.pathname === '/profile/passwordupdate' ? navigate('/profile') : navigate('passwordupdate')}}>
                {window.location.pathname === '/profile/passwordupdate' ? 'Cancel Update':'Update Password'}
            </Link>
            </div>
            </Box>
        </Container>
    </div>
  )
}
