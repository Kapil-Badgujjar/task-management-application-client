import * as React from 'react';
import styles from './StyleComponents.module.css';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/adminSlice/adminSlice';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue.current);
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
                    <DialogTitle sx={{ px: 5, pt: 3}} >Change Role</DialogTitle>
                        <RadioGroup
                        sx={{px:5, pb: 3}}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={(e,value) =>{handleListItemClick(value)}}
                        >
                            <FormControlLabel value="User" control={<Radio checked={ selectedValue?.current === 'User'} />} label="User" />
                            <FormControlLabel value="Admin" control={<Radio checked={ selectedValue?.current === 'Admin'} />} label="Admin" />
                        </RadioGroup>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'User Name', width: 200 },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'email_id', headerName: 'Email Id', width: 350 },
  { field: 'totaltasks', headerName: 'Assigned Tasks', width: 150 },
  { field: 'inprogress', headerName: 'In Progress', width: 150 },
  { field: 'done', headerName: 'Done', width: 150}
];

export default function UsersTable() {
    // *Please note - thesse useStates are used by MUI Components
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(undefined);
  
    const handleClickOpen = (row) => {
        setSelectedValue({current:row.role, id: row.id});
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setUsers(Users.filter( user => {
        if(user.id === selectedValue.id){
          user.role = value;
        }
        return user;
      }));
    };

    const allUsers = useSelector(selectUsers);
    React.useEffect(()=>{
      setUsers(allUsers);
      console.log(allUsers);
    },[allUsers]);

    const [Users, setUsers] = React.useState([
        {
            id: 1,
            email_id: 'kapilbadgujjar99@gmail.com',
            username: 'Kapil Badgujjar',
            role: 'Admin',
            totaltasks: 12,
            inprogress: 9,
            done: 3 
        }
    ]);

  return (
    <div style={{width: '100%' }}>
      <DataGrid
        className={styles.datagrid}
        sx={{ height: 'calc(100vh - 116px)', boxSizing: 'border-box', overflow: 'hidden'}}
        rows={Users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        onCellClick={(params) =>{handleClickOpen(params.row)}}
      />
    {selectedValue && <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />}
    </div>
  );
}