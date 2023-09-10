import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectTasks } from '../features/taskSlice/taskSlice';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const taskStatus = ['Assigned', 'In Progress', 'Done'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
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
                    <DialogTitle >Update status</DialogTitle>
                        <RadioGroup
                        sx={{px:3}}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Assigned"
                            name="radio-buttons-group"
                            onChange={(e,value) =>{console.log(value)}}
                        >
                            <FormControlLabel value="Assigned" control={<Radio />} label="Assigned" />
                            <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
                            <FormControlLabel value="Done" control={<Radio />} label="Done" />
                        </RadioGroup>
                    {/* <List sx={{ pt: 0 }}>
                        {taskStatus.map((status) => (
                        <ListItem disableGutters key={status}>
                            <ListItemButton onClick={() => handleListItemClick(status)}>
                            <ListItemText primary={status} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List> */}
                </div>
                <div style={{paddingBottom: '12px'}}>
                    <DialogTitle sx={{mr: 3}} >Add Comment</DialogTitle>
                    <TextField
                        sx={{mr: 3}}
                        id="outlined-multiline-static"
                        label="Add Comment"
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                </div>
            </div>
            <Button sx={{mb: 3, mx: 3}} variant="contained">Submit</Button>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'tag', headerName: 'Tag', width: 200 },
  { field: 'description', headerName: 'Description', width: 350 },
];

export default function DataTable() {
    // *Please note - thesse useStates are used by MUI Components
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(taskStatus[0]);
  
    const handleClickOpen = (params) => {
        setSelectedValue(params.value);
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
      console.log(value);
    };

    const tasks = useSelector(selectTasks);
    React.useEffect(()=>{
        console.log(tasks);
    },[]);

  return (
    <div style={{width: '100%' }}>
      <DataGrid
        sx={{ height: 'calc(100vh - 114px)', boxSizing: 'border-box', overflow: 'hidden' }}
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
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}