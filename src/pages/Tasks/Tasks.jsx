import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Tasks.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TaskIcon from '@mui/icons-material/Task';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getLastTask, getTasks, taskSlice_updateStatus, taskSlice_updateTask} from '../../features/taskSlice/taskSlice';
import { selectTask, setTitle, setDeadline, setAssignedTo, setTags, setDescription, addTask, selectUsers, selectError, showError, removeError, selectStatus } from '../../features/adminSlice/adminSlice';
import { selectUser } from '../../features/userSlice/userSlice';
import Table from '../../components/Table';

// function to get next day date for default date in create new task
function getDate() {
  const currentDate = new Date(Date.now());
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);
  const year = nextDay.getFullYear();
  const month = String(nextDay.getMonth() + 1).padStart(2, '0');
  const day = String(nextDay.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function SimpleDialog(props) {
  const dispatch = useDispatch();
  
  const { onClose, open } = props;
    // Select User
    const user = useSelector(selectUser);

    // Select tasks
    const task = useSelector(selectTask);

    // Select all users from the admin slice
    const users = useSelector(selectUsers);

    // Select Error from adminSlice
    const error = useSelector(selectError);

    // Select status form adminSlice
    const status = useSelector(selectStatus);

    // Function called when click outside of dialog box
    const handleClose = () => {
      onClose();
    };
  
    // Function called on submit button
    const handleSubmit = (value) => {

      if(!task.title||!task.description||!task.assignedTo||!task.deadline||!task.tags){
        setTimeout(() => dispatch(removeError()), 2000);
        dispatch(showError("Required values can't be empty!"));
        return;
      }
      // requesting the server to get last added task
      setTimeout(()=>dispatch(getLastTask()),250);
      // Dispatch addTask to add new task
      dispatch(addTask());
      onClose();
    };
  
    // MUI theme
    const theme = useTheme();
    // MUI response media queries
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    // useEffect called when error changes
    useEffect(()=>{
      // Dispatch remove Error after 2 seconds to remove the error
      setTimeout(()=> dispatch(removeError()),2000);
    },[error]);

    useEffect(()=>{
      if(status === 'Fullfilled'){
        if(user?.role == 'Admin') dispatch(taskSlice_updateTask(task));
        else dispatch(taskSlice_updateStatus(task));
      }
    },[status]);

    useEffect(()=>{
      dispatch(setDeadline(getDate()));
    },[]);

    return (
      <Dialog
          fullScreen={fullScreen}
          aria-labelledby="responsive-dialog-title"
          open={open}
          onClose={handleClose}>
              <div style={{display: 'flex', flexDirection: 'column', gap:'4px',padding: '24px'}}>
                    <DialogTitle sx={{width: '360px', textAlign: 'center'}}>Create a New Task</DialogTitle>  
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField id="title" label="*Title" variant="standard" value={task.title ? task.title: ''} onChange={(e) => { dispatch(setTitle(e.target.value))}}/>
                    <TextField id="deadline" label="*Deadline" variant="standard" type='date' value={task.deadline ? task.deadline: getDate()} onChange={(e) => { dispatch(setDeadline(e.target.value))}}/>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">*Assigned To</InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={task.assignedTo ? task.assignedTo : ''}
                          onChange={(event) => dispatch(setAssignedTo(event.target.value))}
                          label="Age"
                        >
                          {/* Map all users to make select options */}
                          {users.map(user => <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>)}
                        </Select>
                      </FormControl>
                    <TextField id="tag" label="*Tag" variant="standard" value={task.tags ? task.tags: ''} onChange={(e) => { dispatch(setTags(e.target.value))}}/>
                    <TextField
                        sx={{mt: 2}}
                        id="outlined-multiline-static"
                        label="*Add description"
                        multiline
                        rows={3}
                        value={task.description ? task.description: ''}
                        onChange={(e) => { dispatch(setDescription(e.target.value))}}
                    />
              </div>
              <Button sx={{mb: 3, mx: 3}} onClick={handleSubmit} variant="contained">Submit</Button>
      </Dialog>
    );
  }

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default function Tasks() {
    const user = useSelector(selectUser);

    // *Please note - thesse useStates are used by MUI Components
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    }

  return (
    <div className={styles.tasks}>
        <Box sx={{ flexGrow: 1 , width: '100%'}}>
            <AppBar position="static" sx={{width: '100%'}}>
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
                {user.role === 'Admin' && <Button variant="outlined" sx={{outline: '1px solid white', color: 'white'}} onClick={()=>{handleClickOpen()}}>+ &nbsp;&nbsp;Create new</Button>}
                </Toolbar>
            </AppBar>
        </Box>
        <Table />
        <SimpleDialog
            open={open}
            onClose={handleClose}
        />
    </div>
  )
}
