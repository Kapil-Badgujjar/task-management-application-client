import * as React from 'react';
import styles from './StyleComponents.module.css';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../features/taskSlice/taskSlice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { selectUser } from '../features/userSlice/userSlice';
import { setTitle, setDeadline, setTags, setDescription, selectTask, setTask, updateTask, setStatus, resetTask, updateStatus } from '../features/adminSlice/adminSlice';
import { setId, saveComment, selectComment, writeComment } from '../features/commentsSlice/commentsSlice';

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
  
  const user = useSelector(selectUser);
  const task = useSelector(selectTask)
  const comment = useSelector(selectComment);

  const handleClose = () => {
    dispatch(resetTask());
    onClose();
  };

  const handleSubmit = () => {
    if(user?.role === 'Admin') dispatch(updateTask());
    else dispatch(updateStatus());
    dispatch(saveComment());
    onClose();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
        open={open}
        onClose={handleClose}>
            <div style={{display: 'flex', gap:'10px'}}>
                <div>
                    <DialogTitle >{user?.role === 'Admin' ? 'Update task' : 'Update status'}</DialogTitle>
                        {user?.role === 'Admin' && 
                        <>
                         <TextField sx={{mx: 3, mb: 2 }} id="title" label="*Title" value={task.title ? task.title: ''} onChange={(e) => { dispatch(setTitle(e.target.value))}}/>
                         <TextField sx={{mx: 3, mb: 2 }} id="description" label="Description" type="text"  value={task?.description ? task.description: ''} onChange={(e) => { dispatch(setDescription(e.target.value))}}/>
                         <TextField sx={{mx: 3, mb: 2 }} id="tag" label="Tags" type="text" value={task?.tags ? task.tags:''} onChange={(e) => { dispatch(setTags(e.target.value))}}/>
                         <TextField sx={{mx: 3, mb: 2 }} id="deadline" label="*Deadline" variant='standard' type='date' value={task.deadline ? task.deadline: getDate()} onChange={(e) => { dispatch(setDeadline(e.target.value))}}/>
                        </>
                         }
                        
                        <RadioGroup
                        sx={{px:3}}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(e,value) =>{dispatch(setStatus(value))}}
                        >
                            <FormControlLabel value="Assigned" control={<Radio checked={task?.status === 'Assigned'}/>} label="Assigned" />
                            <FormControlLabel value="In Progress" control={<Radio checked={task?.status === 'In Progress'} />} label="In Progress" />
                            <FormControlLabel value="Done" control={<Radio checked={task?.status === 'Done'} />} label="Done" />
                        </RadioGroup>
                </div>
                <div style={{paddingBottom: '12px'}}>
                    <DialogTitle sx={{mr: 3}} >Add Comment</DialogTitle>
                    <TextField
                        sx={{mr: 3}}
                        id="outlined-multiline-static"
                        label="Add Comment"
                        multiline
                        rows={4}
                        value = {comment}
                        onChange={(e) => {dispatch(writeComment(e.target.value))}}
                    />
                    <DialogTitle sx={{mr: 3}} >Comments</DialogTitle>
                    <div className={styles.commentslist}>

                    </div>
                </div>
            </div>
            <Button sx={{mb: 3, mx: 3}} variant="contained" onClick={handleSubmit}>{user?.role === 'Admin' ? 'Update': 'Submit'}</Button>
            <Button sx={{mb: 3, mx: 3}} variant="outlined" onClick={onClose}>Cancel</Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'deadline', headerName: 'Deadline', width: 250 },
  { field: 'tag', headerName: 'Tag', width: 200 },
  { field: 'description', headerName: 'Description', width: 350 },
];

export default function DataTable() {
    // *Please note - thesse useStates are used by MUI Components
    const [open, setOpen] = React.useState(false);
    // const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleClickOpen = (params) => {
      dispatch(setTask(params.row));
      dispatch(setId(params.row.id));
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const tasks = useSelector(selectTasks);

  return (
    <div style={{width: '100%' }}>
      <DataGrid
        className={styles.datagrid}
        sx={{ height: 'calc(100vh - 116px)', boxSizing: 'border-box', overflow: 'hidden' }}
        rows={tasks}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        onCellClick={(params) =>{handleClickOpen(params)}}
      />
    <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}